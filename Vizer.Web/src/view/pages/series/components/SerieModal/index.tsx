import { FaStar } from 'react-icons/fa'
import { Serie } from '../../../../../app/entities'
import { Loading, Modal, ParentalRating } from '../../../../components'
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
            <img src={data?.poster} alt={data?.poster} className={styles.poster} />
          
            <div style={{ width: '68%' }}>
              <div className={styles.flex}>
                <ParentalRating pr={data?.parentalRating as never}/>
                <div className={styles.category}>
                  {data?.category}
                </div>
                <div className={styles.category}>
                  {data?.numberSeasons} seasons
                </div>
                <span>{data?.releaseYear}</span>
              </div>
              
              <div className={styles.flex}>
                <FaStar/><span>{data?.review.toFixed(1)}</span>
              </div>

              <p className={styles.synopsis}>{data?.synopsis || 'Sem descrição'}</p>
            </div>
          </div>
        : <div className={styles.loading}>
            <Loading size={1.25}/>
          </div>
      }
    </Modal>
  )
}