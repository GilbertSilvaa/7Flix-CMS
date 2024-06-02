import httpClient from '../httpClient'

export interface ISerieGetAllResponse {
  id: string
  title: string
  dateCreated: string
}

export async function getAll() {
  const { data } = await httpClient.get<ISerieGetAllResponse[]>('/serie')
  return data
}
