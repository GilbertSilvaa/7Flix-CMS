import { ReactNode, useEffect, useState } from 'react'
import { BiHomeAlt, BiMovie, BiMoviePlay, BiTestTube } from 'react-icons/bi'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useLocation, useNavigate } from 'react-router-dom'
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
  },
  videoTest:{
    title: 'Validação',
    Icon: BiTestTube,
    path: '/video-test'
  }
}

type TPages = keyof typeof PAGES

export function Layout({ children }: ILayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState<TPages>()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleChangePage(page: TPages) {
    const { path } = PAGES[page]
    setCurrentPage(page)
    navigate(path, { replace: true })
    setIsMenuOpen(screen.width >= 900)
  }

  useEffect(() => {
    const currentRoute = location.pathname.split('/')[1];

    if (currentRoute === 'episodes') {
      setCurrentPage('series')
      return
    }
    if (currentRoute === 'video-test') {
      setCurrentPage('videoTest')
      return
    }
    if (!currentRoute) {
      setCurrentPage('dashboard')
      return
    }
    
    setCurrentPage(currentRoute as TPages)
  }, [location.pathname])

  return (
    <div className={styles.content}>
      <button 
        onClick={() => setIsMenuOpen(prev => !prev)}
        className={styles.menuBurger}
      >
        <RxHamburgerMenu size={20}/>
      </button>

      <div className={styles.menu} style={{display: isMenuOpen ? 'flex': 'none'}}>
        <button 
          onClick={() => setIsMenuOpen(prev => !prev)}
          className={styles.menuBurgerClose}
        >
          <RxHamburgerMenu size={20}/>
        </button>

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
