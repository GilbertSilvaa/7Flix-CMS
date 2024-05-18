import { FaPlus } from 'react-icons/fa6'
import { Button, TableContent } from '../../components'
import { Modal } from '../../components/Modal'
import { MovieForm } from './components/Form'
import { useMoviesController } from './useMoviesController'

export function MoviesView() {
  const { 
    data, 
    isLoading, 
    isMovieModalOpen,
    isMovieFormOpen,
    handleMovieModalClose,
    handleMovieModalOpen,
    handleMovieFormOpen,
    handleMovieFormClose
  } = useMoviesController()

  if (isMovieFormOpen)
    return <MovieForm toBack={handleMovieFormClose} />

  return (
    <div>
      <div className="header-page">
        <h1>Filmes</h1>
        <Button 
          color="var(--blue-2)" 
          onClick={handleMovieFormOpen}
        >
          <FaPlus/><span>Adicionar</span>
        </Button>
      </div>

      <TableContent 
        data={data}
        isLoading={isLoading}
        handleEdit={id => console.log('editando: ', id)}
        handleView={handleMovieModalOpen}
      />

      {isMovieModalOpen && 
        <Modal
          title='Filme' 
          handleClose={handleMovieModalClose}
        >
          <div>
            
          </div>
        </Modal>
      }
    </div>
  )
}
