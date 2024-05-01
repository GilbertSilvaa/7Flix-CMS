import { RiArrowGoBackLine } from 'react-icons/ri'
import { Input, ParentalRatingOptions } from '../../../../components'
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
        <Input label="Título" isRequired/>
        <Input 
          label="Categoria" 
          placeholder="ação, aventura, drama, terror..."
          isRequired
        /> 
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
        <ParentalRatingOptions/>
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
      </form>
    </div>
  )
}
