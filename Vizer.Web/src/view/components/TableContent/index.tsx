import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FaRegEye } from 'react-icons/fa';
import { MdEdit, MdNavigateBefore, MdNavigateNext, MdSearch } from 'react-icons/md';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { Loading } from '../Loading';
import styles from './styles.module.css';

interface ITableContentData {
  id: string
  title: string
  dateCreated: string
  dataAdds?: string[]
}

interface IBtnsAddsProps {
  icon: IconType
  color?: string
  popoverText?: string
  handleClick: (id: string) => void
}

interface ITableContentProps {
  data: ITableContentData[]
  isLoading?: boolean
  handleView: (id: string) => void
  handleEdit: (id: string) => void
  btnsAdds?: IBtnsAddsProps[]
  columnsAdds?: string[]
}

export function TableContent(props: ITableContentProps) {
  const [content, setContent] = useState(props.data)
  const [currentPagination, setCurrentPagination] = useState(0)

  function handleSeach(value: string) {
    setContent(props.data.filter(({ title }) => 
      title.toLowerCase().match(value.toLowerCase())))
  }

  useEffect(() => setContent(props.data), [props.data])

  return (
    <div>
      <div className={styles.search}>
        <div className={styles.inputBox}>
          <Input 
            icon={MdSearch}
            placeholder="pesquisar..." 
            onChange={e => handleSeach(e.target.value)}
          />
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Título</th>
            {props.columnsAdds?.map((c, index) => <th key={index}>{ c }</th>)}
            <th>Cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.isLoading 
            ? <div style={{width: '130%', padding: '1rem'}}><Loading/></div>
            : (content.length
              ? content
                .slice((currentPagination * 6), ((currentPagination * 6) + 6))
                .map((params, index) => (
                  <tr key={index}>
                    <td>{params.title}</td>

                    {props.columnsAdds?.map((_, index) => 
                      <td key={index}>
                        {params.dataAdds ? params.dataAdds[index] : 'N/A'}
                      </td>
                    )}
                    
                    <td>{new Date(params.dateCreated).toLocaleDateString()}</td>
                    
                    <td>
                      <div className={styles.actions}>
                        <IconButton 
                          icon={FaRegEye} 
                          color="var(--orange)"
                          popoverText="visualizar"
                          onClick={() => props.handleView(params.id)} 
                        />
                        <IconButton 
                          icon={MdEdit} 
                          color="var(--blue)"
                          popoverText="editar"
                          onClick={() => props.handleEdit(params.id)} 
                        />

                        {props.btnsAdds?.map((b, index) => 
                          <IconButton 
                            key={index}
                            icon={b.icon} 
                            color={b.color}
                            popoverText={b.popoverText}
                            onClick={() => b.handleClick(params.id)} 
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td style={{padding: '1rem'}}>Sem registros encontrados</td>
                  <td></td>
                  <td></td>
                  {props.columnsAdds?.map((_, index) => <td key={index}></td>)}
                </tr>
            )
          }
        </tbody>
      </table>

      <div className={styles.footer}>
          <button 
            disabled={currentPagination <= 0}
            onClick={() => setCurrentPagination(prev => prev-1)}
          >
            <MdNavigateBefore/>
          </button>
          <span>
            {currentPagination + 1} de {Math.ceil(content.length/6)}
          </span>
          <button 
            disabled={currentPagination + 1 >= Math.ceil(content.length/6)}
            onClick={() => setCurrentPagination(prev => prev+1)}
          >
            <MdNavigateNext/>
          </button>
      </div>
    </div>
  )
}
