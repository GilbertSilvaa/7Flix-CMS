import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { Button, TableContent } from '../../components'
import { Modal } from '../../components/Modal'
import { MovieForm } from './components/Form'
import { useMoviesController } from './useMoviesController'

export function MoviesView() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formView, setFormView] = useState({
    open: false,
    isSubmit: false
  })

  const { isLoading, data } = useMoviesController(formView.isSubmit)

  if (formView.open)
    return <MovieForm 
      toBack={isSubmit => setFormView({
        open: false, 
        isSubmit: Boolean(isSubmit)
      })}
    />

  return (
    <div>
      <div className="header-page">
        <h1>Filmes</h1>
        <Button 
          color="var(--blue-2)" 
          onClick={() => setFormView({
            open: true,
            isSubmit: false
          })}
        >
          <FaPlus/><span>Adicionar</span>
        </Button>
      </div>

      <TableContent 
        data={data}
        isLoading={isLoading}
        handleEdit={id => console.log('editando: ', id)}
        handleView={id =>  setIsModalOpen(true)}
      />

      {isModalOpen && 
        <Modal
          title='Filme' 
          handleClose={() => setIsModalOpen(false)}
        >
          <div>
            
          </div>
        </Modal>
      }
    </div>
  )
}
