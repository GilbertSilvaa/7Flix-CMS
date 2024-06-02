import { FaPlus } from 'react-icons/fa6'
import { Button, TableContent } from '../../components'
import { useSeriesController } from './useSeriesController'

export function SeriesView() {
  const { data, isLoading } = useSeriesController()

  return (
    <div>
      <div className="header-page">
        <h1>Séries</h1>
        <Button color="var(--blue-2)" onClick={() => {}}>
          <FaPlus />
          <span>Adicionar</span>
        </Button>
      </div>
        <TableContent
          data={data}
          isLoading={isLoading}
          handleView={id => console.log('abrir modal', id)}
          handleEdit={id => console.log('editar', id)}
        />
    </div>
  )
}
