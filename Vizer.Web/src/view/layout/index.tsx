import { ReactNode, useState } from 'react'
import { BiHomeAlt, BiMovie, BiMoviePlay } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import styles from './styles.module.css'

interface ILayoutProps {
  children: ReactNode
}

const PAGES = {
  dashboard: {
    title: 'Dashboard',
    Icon: BiHomeAlt,
    path: '/'
  },
  movies:{
    title: 'Filmes',
    Icon: BiMovie,
    path: '/movies'
  },
  series:{
    title: 'Séries',
    Icon: BiMoviePlay,
    path: '/series'
  }
}

type TPages = keyof typeof PAGES

export function Layout({ children }: ILayoutProps) {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState<TPages>('dashboard')

  function handleChangePage(page: TPages) {
    const { path } = PAGES[page]
    setCurrentPage(page)
    navigate(path)
  }

  return (
    <div className={styles.content}>
      <div className={styles.menu}>

        <div className={styles.options}>
          <div className={styles.logo}> 
            <img src={logo} alt="logo"/>
          </div>

          {Object.keys(PAGES).map((p, index) => {
            const { title, Icon } = PAGES[p as TPages]
            return (
              <button 
                key={index}
                className={currentPage === p ? styles.active : ''} 
                onClick={() => handleChangePage(p as TPages)}
              >
                <Icon size={24}/>      
                <span>{ title }</span>              
              </button>
            )
          })}
        </div>

        <div className="logout"></div>
      </div>

      <div className={styles.main}>
        { children }
      </div>
    </div>
  )
}
