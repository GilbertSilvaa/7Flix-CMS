import styles from './styles.module.css'

const PARENTAL_RATINGS = [
  { label: 'L', value: 0 },
  { label: '10', value: 10 },
  { label: '12', value: 12 },
  { label: '14', value: 14 },
  { label: '16', value: 16 },
  { label: '18', value: 18 }
]

interface IParentalRatingOptionsProps {
  onSelect: (value: number) => void
}

export function ParentalRatingOptions({ onSelect }: IParentalRatingOptionsProps) {
  return (
    <div className={styles.content}>
      <label>Classificação Indicativa</label>
      <div className={styles.options}>
        {PARENTAL_RATINGS.map((pr, index) => (
          <div className={styles.option} key={index}>
            <input 
              id={`p__rating_${index}`}
              type="radio" 
              name="rating" 
              value={pr.value} 
              defaultChecked={index == 0}
              onChange={e => onSelect(parseInt(e.target.value))}
            />
            <label htmlFor={`p__rating_${index}`}>{ pr.label }</label>
          </div>
        ))}
      </div>
    </div>
  )
}
