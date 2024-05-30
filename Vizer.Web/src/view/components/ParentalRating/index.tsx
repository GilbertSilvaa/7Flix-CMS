import styles from './styles.module.css'

const PARENTAL_RATINGS_COLORS = {
  0: { label: 'L', color: '#26985a' },
  10: { label: '10', color: '#148bce' },
  12: { label: '12', color: '#ceab14' },
  14: { label: '14', color: '#c97d07' },
  16: { label: '16', color: '#b71f1f' },
  18: { label: '18', color: '#2d2525' }
}

interface IParentalRatingProps {
  pr: keyof typeof PARENTAL_RATINGS_COLORS
}

export function ParentalRating({ pr }: IParentalRatingProps) {
  return (
    <div 
      className={styles.content}
      style={{ backgroundColor: PARENTAL_RATINGS_COLORS[pr].color }}
    >
      { PARENTAL_RATINGS_COLORS[pr].label }
    </div>
  )
}
