import { Midia } from './midia'
import { Video } from './video'

export interface Movie extends Midia {
  category: string
  review: number
  video: Video
}
