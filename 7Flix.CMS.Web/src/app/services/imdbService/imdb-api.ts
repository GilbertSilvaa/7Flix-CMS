import axios from 'axios'
import { sleep } from '../../utils'

const imdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_IMDB_TOKEN,
    language: 'pt-BR',
    page: 1
  }
})

imdbApi.interceptors.response.use(async (data) => {
  await sleep(1000)
  return data
})

export default imdbApi