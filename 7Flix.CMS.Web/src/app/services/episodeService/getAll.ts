import httpClient from '../httpClient'

export interface IEpisodeData {
  id: string
  title: string
  season: number
  episode: number
  dateCreated: string
}

export interface IEpisodeGetAllResponse { 
  serieTitle: string
  numberSeasons: number
  episodes: IEpisodeData[]
}

export async function getAll(serieId: string) {
  const { data } = await httpClient
    .get<IEpisodeGetAllResponse>(`/serie/Episode/${serieId}`)

  return data
}
