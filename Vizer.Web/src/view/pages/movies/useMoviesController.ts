import { useEffect, useState } from 'react'
import { Movie } from '../../../app/entities'
import { movieService } from '../../../app/services/movieService'
import { IMovieGetAllResponse } from '../../../app/services/movieService/getAll'

interface IToggleMovieFormParams {
  id?: string
  isReloadData?: boolean
  state: 'open' | 'close'
}

export function useMoviesController() {
  const [movies, setMovies] = useState<IMovieGetAllResponse[]>([])
  const [movieSelected, setMovieSelected] = useState<Movie>()
  const [isReload, setIsReload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false)
  const [isMovieFormOpen, setIsMovieFormOpen] = useState(false)
  const [movieEditId, setMovieEditId] = useState<string>()

  async function toggleMovieModal(id?: string) { 
    if (id) {
      setIsMovieModalOpen(true)
      setMovieSelected(await movieService.get(id))
      return
    }
    setIsMovieModalOpen(false)
    setMovieSelected(undefined)
  }

  async function toggleMovieForm(params: IToggleMovieFormParams) {  
    if (params.state === 'open') {
      setMovieEditId(params.id)
      setIsMovieFormOpen(true)
      return
    }
    setIsMovieFormOpen(false)
    setMovieEditId(undefined)
    setIsReload(!!params.isReloadData)
  }
  
  async function getMovies() {
    try {
      setIsReload(false)
      setIsLoading(true)
      setMovies(await movieService.getAll())
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getMovies()
  }, [isReload])

  return {
    isLoading,
    data: movies,
    movieSelected,
    movieEditId,
    isMovieModalOpen,
    isMovieFormOpen,
    toggleMovieForm,
    toggleMovieModal
  }
}
