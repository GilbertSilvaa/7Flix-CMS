import { InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'
import styles from './styles.module.css'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: IconType
}

export function Input({ label, icon: Icon, ...props }: IInputProps) {
  return (
    <div className={styles.content}>
      {label && <label>{ label }</label>}
      <div className={styles.inputBox}>
        <input { ...props }/>
        {Icon && <Icon/>}
      </div>
    </div>
  )
}
