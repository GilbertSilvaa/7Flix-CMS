import { FaStar } from 'react-icons/fa'
import { Movie } from '../../../../../app/entities'
import { Loading, Modal, ParentalRating, VideoDetails } from '../../../../components'
import loadingImg from '../../.././../../assets/loading-img.png'
import styles from './styles.module.css'

interface IMovieModalProps {
  data?: Movie
  handleClose: () => void
}

export function MovieModal({ data, handleClose }: IMovieModalProps) {
  return (
    <Modal 
      title={data?.title || ''} 
      handleClose={handleClose}
    >
      {data 
        ? <div className={styles.content}>
            <img 
              src={loadingImg} 
              srcSet={data?.poster} 
              alt={data?.poster}
              className={styles.poster} 
            />
          
            <div className={styles.details}>
              <div className={styles.flex}>
                <ParentalRating pr={data?.parentalRating as never}/>
                <div className={styles.tag}>
                  {data?.category}
                </div>
                <span>{data?.releaseYear}</span>
              </div>
              
              <div className={styles.flex}>
                <FaStar/><span>{data?.review.toFixed(1)}</span>
              </div>

              <div className={styles.synopsis}>{data?.synopsis || 'Sem descrição'}</div>

              {data?.video && <VideoDetails video={data?.video}/>}
            </div>
          </div>
        : <div className={styles.loading}>
            <Loading size={1.25}/>
          </div>
      }
    </Modal>
  )
}
