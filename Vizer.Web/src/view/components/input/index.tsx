import { InputHTMLAttributes } from 'react'
import styles from './styles.module.css'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, ...props }: IInputProps) {
  return (
    <div className={styles.content}>
      {label && <label>{ label }</label>}
      <input { ...props }/>
    </div>
  )
}
