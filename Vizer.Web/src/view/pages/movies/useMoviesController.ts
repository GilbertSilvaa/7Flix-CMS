import { useEffect, useState } from 'react'
import { movieService } from '../../../app/services/movieService'
import { IMovieGetAllResponse } from '../../../app/services/movieService/getAll'

export function useMoviesController(isReload?: boolean) {
  const [movies, setMovies] = useState<IMovieGetAllResponse[]>([])

  async function getMovies() {
    const response = await movieService.getAll()
    setMovies(response)
  }

  useEffect(() => {
    isReload && getMovies()
  }, [isReload])

  return {
    data: movies
  }
}
