import { Episode } from '../../../../../app/entities'
import { Loading, Modal, ParentalRating, VideoDetails } from '../../../../components'
import loadingImg from '../../.././../../assets/loading-img.png'
import styles from './styles.module.css'

interface IEpisodeModalProps {
  data?: Episode
  handleClose: () => void
}

export function EpisodeModal({ data, handleClose }: IEpisodeModalProps) {
  return (
    <Modal title={data?.title || ''} handleClose={handleClose}>
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
                <div className={styles.tag}>T{data.season}</div>
                <div className={styles.tag}>EP{data.number}</div>
                <span>{data?.releaseYear}</span>
              </div>
              
              <p className={styles.synopsis}>{data?.synopsis || 'Sem descrição'}</p>

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