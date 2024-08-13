import { ReactNode } from 'react'
import { IoMdClose } from 'react-icons/io'
import styles from './styles.module.css'

interface IModalProps {
  title: string
  children: ReactNode
  handleClose: () => void
}

export function Modal({ title, handleClose, children }: IModalProps) {
  return (
    <div className={styles.content}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h1>{ title }</h1>
          <button onClick={handleClose}>
            <IoMdClose/>
          </button>
        </div>
        { children }
      </div>
    </div>
  )
}
