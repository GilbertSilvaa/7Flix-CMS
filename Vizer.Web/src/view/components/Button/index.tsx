import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
  color?: string
  children: ReactNode
}

export function Button({ children, color, ...props }: IButtonProps) {
  return (
    <button 
      className={styles.btn} 
      style={{ backgroundColor: color }}
      { ...props }
    >
     { children }
    </button>
  )
}
