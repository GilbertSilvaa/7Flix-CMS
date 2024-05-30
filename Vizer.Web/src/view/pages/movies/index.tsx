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
    handleMovieModalClose,
    handleMovieModalOpen,
    handleMovieFormOpen,
    handleMovieFormClose
  } = useMoviesController()

  if (isMovieFormOpen)
    return <MovieForm 
      movieId={movieEditId} 
      toBack={handleMovieFormClose} 
    />

  return (
    <div>
      <div className="header-page">
        <h1>Filmes</h1>
        <Button 
          color="var(--blue-2)" 
          onClick={() => handleMovieFormOpen()}
        >
          <FaPlus/><span>Adicionar</span>
        </Button>
      </div>

      <TableContent 
        data={data}
        isLoading={isLoading}
        handleEdit={id => handleMovieFormOpen(id)}
        handleView={handleMovieModalOpen}
      />

      {isMovieModalOpen && 
        <MovieModal 
          data={movieSelected} 
          handleClose={handleMovieModalClose}
        />
      }
    </div>
  )
}
