import { FaClock, FaPhotoVideo } from 'react-icons/fa'
import { Video } from '../../../app/entities'
import { secondsToHoursMinutues } from '../../../app/utils'
import { CopyLink } from '../CopyLink'
import styles from './styles.module.css'

interface IVideoDetailsProps {
  video: Video
}

export function VideoDetails({ video }: IVideoDetailsProps) {
  return (
    <div className={styles.content}>
      <CopyLink link={video.url || 'https://localhost:0000/notfound.mp4?notfound=404'} />

      <div style={{ display: 'flex', gap: '1.25rem' }}>
        <div className={styles.info}>
          <FaClock/> <span>{ secondsToHoursMinutues(video.duration) }</span> 
        </div>
        <div className={styles.info}>
          <FaPhotoVideo /> <span>{ video.streamFormat || 'Não informado' }</span> 
        </div>
      </div>
    </div>
  )
}
