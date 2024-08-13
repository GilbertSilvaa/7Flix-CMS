import { Serie } from '../../entities'
import httpClient from '../httpClient'

type TSerieEditParams = Partial<Serie>

interface ISerieEditResponse { }

export async function edit(params: TSerieEditParams) {
  const { data } = await httpClient.put<ISerieEditResponse>('/serie', params)
  return data
}
