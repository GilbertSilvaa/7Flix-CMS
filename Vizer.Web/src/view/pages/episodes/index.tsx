import { FaPlus } from 'react-icons/fa6'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, TableContent } from '../../components'
import { EpisodeForm } from './components/EpisodeForm'
import { EpisodeModal } from './components/EpisodeModal'
import styles from './styles.module.css'
import { useEpisodesController } from './useEpisodesController'

export function EpisodesView() {
  const { serieId } = useParams()
  const navigate = useNavigate()

  const {
    data,
    isLoading,
    serieData,
    episodeEditId,
    episodeSelected,
    isEpisodeFormOpen,
    isEpisodeModalOpen,
    toggleEpisodeForm,
    toggleEpisodeModal
  } = useEpisodesController(serieId!)

  if (isEpisodeFormOpen)
    return <EpisodeForm 
      episodeId={episodeEditId}
      toBack={isSubmit => toggleEpisodeForm({ 
        state: 'close', 
        isReloadData: !!isSubmit 
      })} 
      serieData={{ 
        id: serieId!, 
        numberSeasons: serieData?.numberSeasons 
      }}
    />

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
          
          <h1>{isLoading ? 'Episódios...' : `Episódios ${serieData?.title}`}</h1>
        </div>
        <Button 
          color="var(--blue-2)" 
          onClick={() => toggleEpisodeForm({ state: 'open' })}
        >
          <FaPlus/><span>Adicionar</span>
        </Button>
      </div>

      <TableContent 
        data={data}
        columnsAdds={['Temporada', 'Episódio']}
        isLoading={isLoading}
        handleEdit={id =>  toggleEpisodeForm({ id, state: 'open' })}
        handleView={id => toggleEpisodeModal(id)}
      />

      {isEpisodeModalOpen && 
        <EpisodeModal 
          data={episodeSelected} 
          handleClose={() => toggleEpisodeModal()}
        />
      }
    </div>
  )
}