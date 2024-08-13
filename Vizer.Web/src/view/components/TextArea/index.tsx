import { TextareaHTMLAttributes } from 'react'
import styles from './styles.module.css'

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  isRequired?: boolean
}

export function TextArea({ label, placeholder, isRequired, ...props }: ITextAreaProps) {
  return (
    <div className={styles.content}>
      {label && 
        <label>
          { label } <span>{isRequired && '*'}</span> 
        </label>
      }
      <textarea 
        placeholder={placeholder || 'digite aqui...'}
        required={isRequired}
        {...props}
        ></textarea>
    </div>
  )
}
