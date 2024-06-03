import { RiArrowGoBackLine } from 'react-icons/ri'
import styles from './styles.module.css'

interface ISerieFormProps {
  serieId?: string
  toBack: (isSubmit?: boolean) => void
}

export function SerieForm({ serieId, toBack }: ISerieFormProps) {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <button 
          className={styles.btnBack} 
          onClick={() => toBack(false)}
        >
          <RiArrowGoBackLine/>
        </button>
        
        <h1>{serieId ? 'Editar Série' : 'Cadastrar Série'}</h1>
      </div>
    </div>
  )
}
