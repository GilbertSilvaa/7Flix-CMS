import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loading } from '../Loading'
import styles from './styles.module.css'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
  color?: string
  children: ReactNode
  isLoading?: boolean
}

export function Button({ children, color, isLoading, ...props }: IButtonProps) {
  return (
    <button 
      className={styles.btn} 
      style={{ backgroundColor: color }}
      disabled={isLoading}
      { ...props }
    >
      {isLoading
        ? <Loading/>
        : children
      }
    </button>
  )
}
