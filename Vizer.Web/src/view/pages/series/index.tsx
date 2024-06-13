import { FaPlus } from 'react-icons/fa6'
import { Button, TableContent } from '../../components'
import { SerieForm } from './components/SerieForm'
import { SerieModal } from './components/SerieModal'
import { useSeriesController } from './useSeriesController'

export function SeriesView() {
  const { 
    data, 
    isLoading, 
    serieEditId,
    serieSelected,
    isSerieFormOpen, 
    isSerieModalOpen,
    toggleSerieForm,
    toggleSerieModal
  } = useSeriesController()

  if (isSerieFormOpen) 
    return <SerieForm
      serieId={serieEditId}
      toBack={isReloadData => toggleSerieForm({
        state: 'close',
        isReloadData
      })}
    />

  return (
    <div>
      <div className="header-page">
        <h1>Séries</h1>
        <Button 
          color="var(--blue-2)" 
          onClick={() => toggleSerieForm({ state: 'open' })}
        >
          <FaPlus />
          <span>Adicionar</span>
        </Button>
      </div>

      <TableContent
        data={data}
        isLoading={isLoading}
        handleEdit={id => toggleSerieForm({ id, state: 'open' })}
        handleView={toggleSerieModal}
      />

      {isSerieModalOpen &&
        <SerieModal
          data={serieSelected}
          handleClose={() => toggleSerieModal()}
        />
      }
    </div>
  )
}
