import { useEffect, useState } from 'react'
import { BiSolidCameraMovie } from 'react-icons/bi'
import { MdLocalMovies, MdMovieFilter } from 'react-icons/md'
import { RiFolderVideoFill } from 'react-icons/ri'
import { dashboardService } from '../../../app/services/dashboardService'

const CARDS_BASE = [
  {
    Icon: MdMovieFilter,
    quantity: 0,
    label: 'Qtde. Filmes',
    backgroundColor: '#1fa85a',
    backgroundColorAlt: '#64de99'
  },
  {
    Icon: MdLocalMovies,
    quantity: 0,
    label: 'Qtde. Séries',
    backgroundColor: '#b35ff7',
    backgroundColorAlt: '#c993f5'
  },
  {
    Icon: RiFolderVideoFill,
    quantity: 0,
    label: 'Qtde. Episódios',
    backgroundColor: '#6550ff',
    backgroundColorAlt: '#8a7bfd'
  },
  {
    Icon: BiSolidCameraMovie,
    quantity: 0,
    label: 'Qtde. Vods Total',
    backgroundColor: '#cb522e',
    backgroundColorAlt: '#ec9175'
  }
]

export function useDashboardController() {
  const [cards, setCards] = useState(CARDS_BASE)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)

        const response = await dashboardService.get()
        setCards(CARDS_BASE.map((card, index) => 
          ({...card, quantity: Object.values(response)[index]})))
      }
      finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return { cards, isLoading }
}