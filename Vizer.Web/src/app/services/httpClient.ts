import axios from 'axios'
import { sleep } from '../utils'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

httpClient.interceptors.response.use(async (data) => {
  await sleep(1000)
  return data
})

export default httpClient
