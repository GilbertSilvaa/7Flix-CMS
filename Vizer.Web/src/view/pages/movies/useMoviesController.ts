import { useEffect, useState } from 'react'
import { movieService } from '../../../app/services/movieService'
import { IMovieGetAllResponse } from '../../../app/services/movieService/getAll'

export function useMoviesController() {
  const [movies, setMovies] = useState<IMovieGetAllResponse[]>([])
  const [isReload, setIsReload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false)
  const [isMovieFormOpen, setIsMovieFormOpen] = useState(false)

  async function handleMovieModalOpen(id: string) {
    setIsMovieModalOpen(true)
    
    const response = await movieService.get(id)
    console.log(response)
  } 
  const handleMovieModalClose = () =>
    setIsMovieModalOpen(false)

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
    isMovieModalOpen,
    isMovieFormOpen,
    handleMovieModalClose,
    handleMovieModalOpen,
    handleMovieFormOpen,
    handleMovieFormClose
  }
}
