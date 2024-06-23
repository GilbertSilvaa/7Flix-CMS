import { Episode } from '../../entities'
import httpClient from '../httpClient'

interface IEpisodeGetParams {
  serieId: string
  episodeId: string
}

export async function get({ episodeId, serieId }: IEpisodeGetParams) {
  const { data } = await httpClient
    .get<Episode>(`/serie/Episode/${serieId}/${episodeId}`)
      
  return data
}
