import { ImSpinner8 } from 'react-icons/im'
import styles from './styles.module.css'

interface ILoadingProps {
  size?: number
}

export function Loading({ size }: ILoadingProps) {
  return (
    <div style={{ fontSize: `${size ?? 1}rem` }} className={styles.content}>
      <ImSpinner8 size={ size ? undefined : 20 } className={styles.spinner} />
      <span>Carregando...</span>
    </div>
  )
}
