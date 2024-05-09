import httpClient from '../httpClient'

export interface IMovieGetAllResponse { 
  id: string
  title: string
  dateCreated: string
}

export async function getAll() {
  const { data } = await httpClient.get<IMovieGetAllResponse[]>('/movie')
  return data
}
