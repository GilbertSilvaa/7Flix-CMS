import { Midia } from './midia'
import { Video } from './video'

export interface Episode extends Midia {
  season: number
  number: number
  video: Video
}
