import { IconType } from 'react-icons'
import styles from './styles.module.css'

interface ICardQuatityProps {
  Icon: IconType
  quantity: number
  label: string
  backgroundColor: string
}

export function CardQuantity({ backgroundColor, ...props }: ICardQuatityProps) {
  return (
    <div 
      className={styles.card} 
      style={{ backgroundColor }}
    >
      <main>
        <props.Icon size={64} className={styles.icon}/>
        <span className={styles.quantity}>
          { props.quantity }
        </span>
      </main>
      
      <footer>
        { props.label }
      </footer>
    </div>
  )
}
