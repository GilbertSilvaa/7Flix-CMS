import { FaPlus } from 'react-icons/fa6'
import { Button, TableContent } from '../../components'
import { MovieForm } from './components/MovieForm'
import { MovieModal } from './components/MovieModal'
import { useMoviesController } from './useMoviesController'

export function MoviesView() {
  const { 
    data, 
    isLoading, 
    movieSelected,
    movieEditId,
    isMovieModalOpen,
    isMovieFormOpen,
    toggleMovieForm,
    toggleMovieModal
  } = useMoviesController()

  if (isMovieFormOpen)
    return <MovieForm 
      movieId={movieEditId} 
      toBack={isReloadData => toggleMovieForm({ 
        isReloadData, 
        state: 'close' 
      })} 
    />

  return (
    <div>
      <div className="header-page">
        <h1>Filmes</h1>
        <Button 
          color="var(--blue-2)" 
          onClick={() => toggleMovieForm({ state: 'open' })}
        >
          <FaPlus/><span>Adicionar</span>
        </Button>
      </div>

      <TableContent 
        data={data}
        isLoading={isLoading}
        handleEdit={id => toggleMovieForm({ id, state: 'open' })}
        handleView={toggleMovieModal}
      />

      {isMovieModalOpen && 
        <MovieModal 
          data={movieSelected} 
          handleClose={() => toggleMovieModal()}
        />
      }
    </div>
  )
}
