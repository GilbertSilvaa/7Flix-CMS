import { Movie } from '../../entities'
import httpClient from '../httpClient'

export async function get(id: string) {
  const { data } = await httpClient.get<Movie>('/movie/'+ id)
  return data
}
