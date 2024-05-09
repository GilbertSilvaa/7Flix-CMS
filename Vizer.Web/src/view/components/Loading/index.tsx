import { ImSpinner8 } from 'react-icons/im'
import styles from './styles.module.css'

export function Loading() {
  return (
    <div className={styles.content}>
      <ImSpinner8 size={30} className={styles.spinner} />
      <h1>Carregando...</h1>
    </div>
  )
}