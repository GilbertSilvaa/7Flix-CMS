import { ButtonHTMLAttributes, useState } from 'react'
import { IconType } from 'react-icons'
import styles from './styles.module.css'

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType
  color?: string
  popoverText?: string
}

export function IconButton({ icon: Icon, color, popoverText,...props }: IIconButtonProps) {
  const [isOpenPopover, setIsOpenPopover] = useState(false)
  const [timerOut, setTimerOut] = useState<number>()

  function openPopover() {
    const timer = setTimeout(() => setIsOpenPopover(true), 600)
    setTimerOut(timer)
  }
  function closePopover() {
    clearTimeout(timerOut)
    setIsOpenPopover(false)
  }

  return (
    <div className={styles.content}>
      <button 
        onMouseOver={openPopover}
        onMouseOut={closePopover}
        style={{ backgroundColor: color || 'var(--blue)' }}
        {...props} 
      >
        <Icon/>
      </button>

      {(isOpenPopover && popoverText) 
        && <div className={styles.popover}>{ popoverText }</div>
      }
    </div>
  )
}