import { useEffect, useState } from 'react'
import { Movie } from '../../../app/entities'
import { movieService } from '../../../app/services/movieService'
import { IMovieGetAllResponse } from '../../../app/services/movieService/getAll'

export function useMoviesController() {
  const [movies, setMovies] = useState<IMovieGetAllResponse[]>([])
  const [movieSelected, setMovieSelected] = useState<Movie>()
  const [isReload, setIsReload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false)
  const [isMovieFormOpen, setIsMovieFormOpen] = useState(false)

  async function handleMovieModalOpen(id: string) {
    setIsMovieModalOpen(true)
    setMovieSelected(await movieService.get(id))
  } 
  function handleMovieModalClose() {
    setIsMovieModalOpen(false)
    setMovieSelected(undefined)
  }

  function handleMovieFormOpen() {
    setIsMovieFormOpen(true)
  }
  function handleMovieFormClose(isReloadData?: boolean) {
    setIsMovieFormOpen(false)
    setIsReload(!!isReloadData)
  }
  
  async function getMovies() {
    try {
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
    isMovieModalOpen,
    isMovieFormOpen,
    handleMovieModalClose,
    handleMovieModalOpen,
    handleMovieFormOpen,
    handleMovieFormClose
  }
}
