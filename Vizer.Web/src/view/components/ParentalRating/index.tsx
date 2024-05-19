import styles from './styles.module.css'

const PARENTAL_RATINGS_COLORS = {
  'L': '#26985a',
  '10': '#148bce',
  '12': '#ceab14',
  '14': '#c97d07',
  '16': '#b71f1f',
  '18': '#2d2525'
}

interface IParentalRatingProps {
  pr: keyof typeof PARENTAL_RATINGS_COLORS
}

export function ParentalRating({ pr }: IParentalRatingProps) {
  return (
    <div 
      className={styles.content}
      style={{ backgroundColor: PARENTAL_RATINGS_COLORS[pr] }}
    >
      { pr }
    </div>
  )
}
