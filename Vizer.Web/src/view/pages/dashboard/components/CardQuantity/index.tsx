import { IconType } from 'react-icons'
import { ImSpinner8 } from 'react-icons/im'
import styles from './styles.module.css'

interface ICardQuatityProps {
  Icon: IconType
  quantity: number
  label: string
  backgroundColor: string
  isLoading?: boolean
}

export function CardQuantity({ backgroundColor, ...props }: ICardQuatityProps) {
  return (
    <div 
      className={styles.card} 
      style={{ backgroundColor }}
    >
      <main>
        <props.Icon size={64} className={styles.icon}/>

        {props.isLoading 
          ? <ImSpinner8 size={24} className={styles.spinner} />
          : <span className={styles.quantity}>{ props.quantity }</span>
        }
      </main>
      
      <footer>
        { props.label }
      </footer>
    </div>
  )
}
