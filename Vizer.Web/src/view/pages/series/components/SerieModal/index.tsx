import { FaStar } from 'react-icons/fa'
import { Serie } from '../../../../../app/entities'
import { Loading, Modal, ParentalRating } from '../../../../components'
import loadingImg from '../../.././../../assets/loading-img.png'
import styles from './styles.module.css'

interface ISerieModalProps {
  data?: Serie
  handleClose: () => void
}

export function SerieModal({ data, handleClose }: ISerieModalProps) {
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
          
            <div style={{ width: '68%' }}>
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

              <p className={styles.synopsis}>{data?.synopsis || 'Sem descrição'}</p>

              <div className={styles.flex}>
                <div className={styles.tag}>
                  {data?.numberSeasons} temporadas
                </div>
                <div className={styles.tag}>
                  {data?.numberEpisodes} episódios
                </div>
              </div>
            </div>
          </div>
        : <div className={styles.loading}>
            <Loading size={1.25}/>
          </div>
      }
    </Modal>
  )
}