import { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons'
import styles from './styles.module.css'

interface IIconButton extends ButtonHTMLAttributes<HTMLButtonElement>  {
  icon: IconType
}

export function IconButton({ icon: Icon, ...props }: IIconButton) {
  return (
    <button className={styles.btn} { ...props }>
      <Icon/>
    </button>
  )
}
