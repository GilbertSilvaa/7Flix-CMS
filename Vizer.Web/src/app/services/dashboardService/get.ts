import httpClient from '../httpClient'

interface IDashboardGetResponse {
  moviesCount: number,
  seriesCount: number,
  episodesCount: number,
  vodCount: number
}

export async function get() {
  const { data } = await httpClient.get<IDashboardGetResponse>('/Dashboard')
  return data
}
