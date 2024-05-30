import { FaClock, FaPhotoVideo } from 'react-icons/fa'
import { Video } from '../../../app/entities'
import { CopyLink } from '../CopyLink'
import styles from './styles.module.css'

interface IVideoDetailsProps {
  video: Video
}

export function VideoDetails({ video }: IVideoDetailsProps) {
  return (
    <div className={styles.content}>
      <CopyLink link={video.url} />
      <div className={styles.info}>
        <FaClock/> <span>2h 20min</span> 
      </div>
      <div className={styles.info}>
        <FaPhotoVideo /> <span>{ video.streamFormat }</span> 
      </div>
    </div>
  )
}
