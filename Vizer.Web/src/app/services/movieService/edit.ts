import { Movie } from '../../entities'
import httpClient from '../httpClient'

type TMovieEditParams = Partial<Movie>

interface IMovieEditResponse { }

export async function edit(params: TMovieEditParams) {
  const { data } = await httpClient.put<IMovieEditResponse>('/movie', params)
  return data
}
