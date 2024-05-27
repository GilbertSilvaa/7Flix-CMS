import { FaStar } from 'react-icons/fa'
import { Movie } from '../../../../../app/entities'
import { Modal } from '../../../../components/Modal'
import { ParentalRating } from '../../../../components/ParentalRating'
import { VideoDetails } from '../../../../components/VideoDetails'
import styles from './styles.module.css'

interface IMovieModalProps {
  data?: Movie
  handleClose: () => void
}

export function MovieModal({ data, handleClose }: IMovieModalProps) {
  console.log(data) 
  return (
    <Modal 
      title={data?.title || ''} 
      handleClose={handleClose}
    >
      <div className={styles.content}>
        <img src={data?.poster} alt={data?.poster} className={styles.poster} />
      
        <div style={{ width: '68%' }}>
          <div className={styles.flex}>
            <ParentalRating pr={data?.parentalRating as never}/>
            <div className={styles.category}>
              {data?.category}
            </div>
            <span>{data?.releaseYear}</span>
          </div>
          
          <div className={styles.flex}>
            <FaStar/><span>{data?.review}</span>
          </div>

          <p className={styles.synopsis}>{data?.synopsis}</p>

          {data?.video && <VideoDetails video={data?.video}/>}
        </div>

      </div>
    </Modal>
  )
}
