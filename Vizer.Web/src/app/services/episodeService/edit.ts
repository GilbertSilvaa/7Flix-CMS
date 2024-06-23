import { Episode } from '../../entities'
import httpClient from '../httpClient'

interface IEpisodeEditParams extends Partial<Episode> {
  id: string
  idSerie: string
}

interface IEpisodeEditResponse { }

export async function edit(params: IEpisodeEditParams) {
  const { data } = await httpClient
    .put<IEpisodeEditResponse>('/serie/Episode', params)

  return data
}
