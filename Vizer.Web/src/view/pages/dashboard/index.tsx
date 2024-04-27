import { MdMovieFilter , MdLocalMovies } from 'react-icons/md'
import { BiSolidCameraMovie } from 'react-icons/bi';
import { CardQuantity } from './components/CardQuantity'
import styles from './styles.module.css'

const CARDS = [
  {
    Icon: MdLocalMovies,
    quantity: 208,
    label: 'Qtde. Series',
    backgroundColor: '#1fa85a'
  },
  {
    Icon: MdMovieFilter,
    quantity: 455,
    label: 'Qtde. Filmes',
    backgroundColor: '#b35ff7'
  },
  {
    Icon: BiSolidCameraMovie,
    quantity: 663,
    label: 'Qtde. Conteúdo Total',
    backgroundColor: '#cb522e'
  }
]

export function DashboardView() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className={styles.cards}>
        {CARDS.map((c, index) => (
          <CardQuantity
            key={index}
            Icon={c.Icon}
            quantity={c.quantity}
            label={c.label}
            backgroundColor={c.backgroundColor}
          />
        ))}
      </div>
    </div>
  )
}
