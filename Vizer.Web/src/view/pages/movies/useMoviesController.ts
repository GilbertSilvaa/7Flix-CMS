import { useEffect, useState } from 'react'
import { movieService } from '../../../app/services/movieService'
import { IMovieGetAllResponse } from '../../../app/services/movieService/getAll'

export function useMoviesController(isReload?: boolean) {
  const [movies, setMovies] = useState<IMovieGetAllResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function getMovies() {
    try {
      setIsLoading(true)
      const response = await movieService.getAll()
      setMovies(response)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    isReload && getMovies()
  }, [isReload])

  return {
    isLoading,
    data: movies
  }
}
