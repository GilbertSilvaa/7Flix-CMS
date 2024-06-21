import { Episode } from '../../entities'
import httpClient from '../httpClient'

type TEpisodeCreateParams = Partial<Episode>

interface IEpisodeCreateResponse { }

export async function create(params: TEpisodeCreateParams) {
  const { data } = await httpClient.post<IEpisodeCreateResponse>('/serie/AddEpisode', params)
  return data
}
