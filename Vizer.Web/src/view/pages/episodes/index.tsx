import { FaPlus } from 'react-icons/fa6'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, TableContent } from '../../components'
import styles from './styles.module.css'
import { useEpisodesController } from './useEpisodesController'

export function EpisodesView() {
  const { serieId } = useParams()
  const navigate = useNavigate()

  const {
    data,
    isLoading,
    serieTitle
  } = useEpisodesController(serieId!)

  return (
    <div className={styles.content}>
      <div className="header-page">
        <div className={styles.header}>
          <button 
            className={styles.btnBack} 
            onClick={() => navigate('/series', { replace: true })}
          >
            <RiArrowGoBackLine/>
          </button>
          
          <h1>{serieTitle} (Episódios)</h1>
        </div>
        <Button 
          color="var(--blue-2)" 
          onClick={() => {}}
        >
          <FaPlus/><span>Adicionar</span>
        </Button>
      </div>

      <TableContent 
        data={data}
        isLoading={isLoading}
        handleEdit={id => console.log(id)}
        handleView={() => {}}
      />
    </div>
  )
}