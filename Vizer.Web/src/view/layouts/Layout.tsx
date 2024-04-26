import { ReactNode } from 'react'
import logo from '../../assets/logo.png'
import styles from './Layout.module.css'

interface ILayoutProps {
  children: ReactNode
}

export function Layout({ children }: ILayoutProps) {
  return (
    <div className={styles.content}>
      <div className={styles.menu}>

        <div className={styles.options}>
          <div className={styles.logo}> 
            <img src={logo} alt="logo"/>
          </div>

          <button className={styles.active}>Dashboard</button>
          <button>Movies</button>
          <button>Series</button>
        </div>

        <div className="logout"></div>
      </div>

      <div className={styles.main}>
        { children }
      </div>
    </div>
  )
}
