import { Serie } from '../../entities'
import httpClient from '../httpClient'

type TSerieCreateParams = Partial<Serie>

interface ISerieCreateResponse { }

export async function create(params: TSerieCreateParams) {
  const { data } = await httpClient.post<ISerieCreateResponse>('/serie', params)
  return data
}
