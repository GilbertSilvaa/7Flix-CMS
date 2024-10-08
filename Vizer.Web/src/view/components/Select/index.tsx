import { SelectHTMLAttributes } from 'react'
import styles from './styles.module.css'

interface IOptionData {
  value: string
  label: string
}

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  isRequired?: boolean
  options: IOptionData[]
}

export function Select({ label, isRequired, options, ...props }: ISelectProps) {
  return (
    <div className={styles.content}>
      {label && 
        <label>
          { label } <span>{isRequired && '*'}</span> 
        </label>
      }

      <select required={isRequired} {...props}>
        <option value="">selecione uma opção</option>
        {options.map((o, index) => 
          <option key={index} value={o.value}>{o.label}</option>)
        }
      </select>
    </div>
  )
}
