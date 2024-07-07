import { Movie } from '../../entities'
import api from './imdb-api'

interface IMovieImdbResponse {
  title: string
  adult: boolean
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
  backdrop_path: string
  genres: Array<{name: string}>
}

export async function getMovie(id: string) {
  const { data } = await api.get<IMovieImdbResponse>(`/movie/${id}`)
  return movieImdbToEntityAdapter(data)
}

function movieImdbToEntityAdapter(data: IMovieImdbResponse) {
  return {
    title: data.title,
    synopsis: data.overview,
    review: data.vote_average,
    category: data.genres[0].name.toLowerCase(),
    parentalRating: data.adult ? 18 : 0,
    releaseYear: data.release_date.split('-')[0],
    banner: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
    poster: `https://image.tmdb.org/t/p/original${data.poster_path}`,
    video: {
      duration: 0,
      streamFormat: '',
      url: ''
    }
  } as Movie
}