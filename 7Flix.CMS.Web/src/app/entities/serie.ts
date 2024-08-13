import { Episode } from './episode'
import { Midia } from './midia'

export interface Serie extends Midia {
  category: string
  review: number
  numberSeasons: number
  numberEpisodes?: number
  episodes: Episode[]
}
