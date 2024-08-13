import { Movie } from '../../entities'
import httpClient from '../httpClient'

type TMovieCreateParams = Partial<Movie>

interface IMovieCreateResponse { }

export async function create(params: TMovieCreateParams) {
  const { data } = await httpClient.post<IMovieCreateResponse>('/movie', params)
  return data
}
