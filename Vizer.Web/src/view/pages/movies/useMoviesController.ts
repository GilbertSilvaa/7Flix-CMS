import { useEffect, useState } from 'react'
import { movieService } from '../../../app/services/movieService'
import { IMovieGetAllResponse } from '../../../app/services/movieService/getAll'

export function useMoviesController() {
  const [movies, setMovies] = useState<IMovieGetAllResponse[]>([])

  useEffect(() => {
    (async () => setMovies(await movieService.getAll()))()
  }, [])

  return {
    data: movies
  }
}
