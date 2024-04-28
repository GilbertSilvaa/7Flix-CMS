import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { BiSolidCameraMovie } from 'react-icons/bi';
import { MdLocalMovies, MdMovieFilter } from 'react-icons/md';
import { CardQuantity } from './components/CardQuantity';
import styles from './styles.module.css';

const CARDS = [
  {
    Icon: MdMovieFilter,
    quantity: 455,
    label: 'Qtde. Filmes',
    backgroundColor: '#1fa85a',
    backgroundColorAlt: '#64de99'
  },
  {
    Icon: MdLocalMovies,
    quantity: 208,
    label: 'Qtde. Séries',
    backgroundColor: '#b35ff7',
    backgroundColorAlt: '#c993f5'
  },
  {
    Icon: BiSolidCameraMovie,
    quantity: 663,
    label: 'Qtde. Conteúdo Total',
    backgroundColor: '#cb522e',
    backgroundColorAlt: '#ec9175'
  }
]

ChartJS.register(ArcElement, Tooltip, Legend)

export function DashboardView() {
  return (
    <div className={styles.content}>
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

      <div className={styles.charts}>
        <Bar 
          data={{
            labels: ['Qtde. Conteúdos'],
            datasets: CARDS
              .filter((c, index) => index != CARDS.length - 1)
              .map(c => ({
                label: c.label,
                data: [c.quantity],
                backgroundColor: [c.backgroundColorAlt],
                borderRadius: 12
              }))
          }}
          options={{ color: '#c4c4c4' }}
        />
      </div>
    </div>
  )
}
