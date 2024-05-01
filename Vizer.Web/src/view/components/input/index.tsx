import { InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'
import styles from './styles.module.css'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: IconType
  isRequired?: boolean
}

export function Input({
  label, 
  isRequired,
  placeholder, 
  icon: Icon, 
  ...props 
}: IInputProps) {
  return (
    <div className={styles.content}>
      {label && 
        <label>
          { label } <span>{isRequired && '*'}</span> 
        </label>
      }
      <div className={styles.inputBox}>
        <input 
          placeholder={placeholder || 'digite aqui...'} 
          required={isRequired} 
          { ...props }
        />
        {Icon && <Icon/>}
      </div>
    </div>
  )
}
