import { RiArrowGoBackLine } from 'react-icons/ri'
import styles from './styles.module.css'

interface IEpisodeFormProps {
  episodeId?: string
  toBack: (isSubmit?: boolean) => void
}

export function EpisodeForm({ toBack, episodeId }: IEpisodeFormProps) {
  console.log(episodeId)

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <button 
          className={styles.btnBack} 
          onClick={() => toBack(false)}
        >
          <RiArrowGoBackLine/>
        </button>
        
        <h1>Cadastrar Episódio</h1>
      </div>

      <form className={styles.form}>

      </form>
    </div>
  )
}