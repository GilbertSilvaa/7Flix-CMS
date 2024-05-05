import { IoAlertCircleOutline, IoCheckmarkDoneSharp } from 'react-icons/io5'
import { useToast } from '../../../app/hooks/useToast'
import styles from './styles.module.css'

export function Toast() {
  const { data } = useToast()

  return (
    <> 
    {data &&
      <div 
        className={`${styles.content} 
        ${data.type === 'success' ? styles.success : styles.error }`}
      >
        <div className={styles.icon}>
          {data.type === 'success' && <IoCheckmarkDoneSharp size={24}/>}
          {data.type === 'error' && <IoAlertCircleOutline size={24}/>}
        </div>
        <span className={styles.text}>{ data.message }</span>
      </div>
    }
    </>
  )
}
