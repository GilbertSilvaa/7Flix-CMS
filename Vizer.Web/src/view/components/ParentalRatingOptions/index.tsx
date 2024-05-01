import styles from './styles.module.css'

const PARENTAL_RATINGS = [
  {
    label: 'L',
    value: 0
  },
  {
    label: '10',
    value: 10
  },
  {
    label: '12',
    value: 12
  },
  {
    label: '14',
    value: 14
  },
  {
    label: '16',
    value: 16
  },
  {
    label: '18',
    value: 18
  },
]

export function ParentalRatingOptions() {
  return (
    <div className={styles.content}>
      <label>Classificação Indicativa</label>
      <div className={styles.options}>
        {PARENTAL_RATINGS.map((pr, index) => (
          <div className={styles.option}>
            <input 
              type="radio" 
              name="rating" 
              value={pr.value} 
              defaultChecked={index == 0}
            />
            <label>{ pr.label }</label>
          </div>
        ))}
      </div>
    </div>
  )
}
