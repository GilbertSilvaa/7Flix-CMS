import { MdMovieFilter , MdLocalMovies } from 'react-icons/md'
import { BiSolidCameraMovie } from 'react-icons/bi';
import { CardQuantity } from './components/CardQuantity'
import styles from './styles.module.css'

export function DashboardView() {
  return (
    <div>
      <h1>Dashboard</h1>

      <div className={styles.cards}>
        <CardQuantity
          Icon={MdMovieFilter }
          quantity={455}
          label='Qtde. Filmes'
          backgroundColor='#1fa85ad0'
        />

        <CardQuantity
          Icon={MdLocalMovies}
          quantity={208}
          label='Qtde. Series'
          backgroundColor='#b35ff7'
        />

        <CardQuantity
          Icon={BiSolidCameraMovie}
          quantity={663}
          label='Qtde. Conteúdo Total'
          backgroundColor='#cb522e'
        />
      </div>
    </div>
  )
}
