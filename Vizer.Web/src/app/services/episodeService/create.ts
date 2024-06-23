import { Episode } from '../../entities'
import httpClient from '../httpClient'

interface IEpisodeCreateParams extends Partial<Episode> {
  idSerie: string
}

interface IEpisodeCreateResponse { }

export async function create(params: IEpisodeCreateParams) {
  const { data } = await httpClient.post<IEpisodeCreateResponse>('/serie/Episode', params)
  return data
}
