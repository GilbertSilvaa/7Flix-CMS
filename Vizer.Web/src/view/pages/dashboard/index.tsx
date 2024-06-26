import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { CardQuantity } from './components/CardQuantity';
import styles from './styles.module.css';
import { useDashboardController } from './useDashboardController';

ChartJS.register(ArcElement, Tooltip, Legend)

export function DashboardView() {
  const { cards, isLoading } = useDashboardController()

  return (
    <div className={styles.content}>
      <div className="header-page">
        <h1>Dashboard</h1>
      </div>
      
      <div className={styles.cards}>
        {cards.map((c, index) => (
          <CardQuantity
            key={index}
            Icon={c.Icon}
            quantity={c.quantity}
            label={c.label}
            backgroundColor={c.backgroundColor}
            isLoading={isLoading}
          />
        ))}
      </div>

      <div className={styles.charts}>
        <Bar 
          data={{
            labels: ['Qtde. Conteúdos'],
            datasets: cards
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
