import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { Button, TableContent } from '../../components'
import { MovieForm } from './components/Form'
import { DATA } from './data'

export function MoviesView() {
  const [isFormView, setIsFormView] = useState(false)

  if (isFormView)
    return <MovieForm toBack={() => setIsFormView(false)}/>

  return (
    <div>
      <div className="header-page">
        <h1>Filmes</h1>
        <Button color="var(--blue-2)" onClick={() => setIsFormView(true)}>
          <FaPlus/>
          <span>Adicionar</span>
        </Button>
      </div>

      <TableContent 
        data={DATA}
        handleEdit={id => console.log('editando: ', id)}
        handleView={id =>  console.log('visualizando: ', id)}
      />
    </div>
  )
}
