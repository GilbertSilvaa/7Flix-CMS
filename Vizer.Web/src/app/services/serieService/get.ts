import { Serie } from '../../entities'
import httpClient from '../httpClient'

export async function get(id: string) {
  const { data } = await httpClient.get<Serie>('/serie/'+ id)
  return data
}
