import { RiArrowGoBackLine } from 'react-icons/ri'
import { Button, Input, ParentalRatingOptions } from '../../../../components'
import styles from './styles.module.css'

interface IMovieFormProps {
  toBack: () => void
}

export function MovieForm({ toBack }: IMovieFormProps) {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <button 
          className={styles.btnBack} 
          onClick={toBack}
        >
          <RiArrowGoBackLine/>
        </button>
        
        <h1>Cadastrar Filme</h1>
      </div>

      <form className={styles.form}>

        <div className={styles.doubleInput}>
          <Input label="Título" isRequired/>
          <Input 
            label="Categoria" 
            placeholder="ação, aventura, drama, terror..."
            isRequired
          /> 
        </div>

        <div className={styles.doubleInput}>
          <Input 
            label="Nota Review" 
            placeholder="7.5"
            isRequired
          />  
          <Input 
            label="Ano Lançamento" 
            placeholder="2020"
            isRequired
          /> 
        </div>
        <ParentalRatingOptions/>

        <div className={styles.doubleInput}>
          <Input 
            label="Poster (URL)" 
            placeholder="https://www.imagem.jpg"
            isRequired
          />
          <Input 
            label="Banner (URL)" 
            placeholder="https://www.imagem.jpg"
            isRequired
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <Button color="var(--orange)">
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  )
}
