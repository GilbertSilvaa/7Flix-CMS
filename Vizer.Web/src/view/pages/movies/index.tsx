import { TableContent } from '../../components/tableContent';
import { DATA } from './data';

export function MoviesView() {
  return (
    <div>
      <h1>Filmes</h1>

      <TableContent 
        data={DATA}
        handleEdit={id => console.log('editando: ', id)}
        handleView={id =>  console.log('visualizando: ', id)}
      />
    </div>
  )
}
