import { IoAlertCircleOutline, IoCheckmarkDoneSharp } from 'react-icons/io5'
import { PiWarning } from 'react-icons/pi'
import { useToast } from '../../../app/hooks/useToast'
import styles from './styles.module.css'

export function Toast() {
  const { data } = useToast()

  return (
    <> 
    {data &&
      <div className={`${styles.content} ${styles[data?.type || 'success']}`}>
        <div className={styles.icon}>
          {data.type === 'success' && <IoCheckmarkDoneSharp size={24}/>}
          {data.type === 'error' && <IoAlertCircleOutline size={24}/>}
          {data.type === 'warning' && <PiWarning size={24}/>}
        </div>
        <span className={styles.text}>{ data.message }</span>
      </div>
    }
    </>
  )
}
