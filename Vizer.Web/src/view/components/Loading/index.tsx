import { ImSpinner8 } from 'react-icons/im'
import styles from './styles.module.css'

export function Loading() {
  return (
    <div className={styles.content}>
      <ImSpinner8 size={20} className={styles.spinner} />
      <span>Carregando...</span>
    </div>
  )
}
