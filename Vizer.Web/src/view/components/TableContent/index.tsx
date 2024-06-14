import { useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { MdEdit, MdNavigateBefore, MdNavigateNext, MdSearch } from 'react-icons/md';
import { Input } from '../Input';
import { Loading } from '../Loading';
import styles from './styles.module.css';
import { IconType } from 'react-icons';

interface ITableContentData {
  id: string
  title: string
  dateCreated: string
}

interface IBtnsAddsProps {
  icon: IconType
  color: string
  handleClick: (id: string) => void
}

interface ITableContentProps {
  data: ITableContentData[]
  isLoading?: boolean
  handleView: (id: string) => void
  handleEdit: (id: string) => void
  btnsAdds?: IBtnsAddsProps[]
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
                    <td>{new Date(params.dateCreated).toLocaleDateString()}</td>
                    <td>
                      <div className={styles.actions}>
                        <button 
                          onClick={() => props.handleView(params.id)} 
                          style={{ background: 'var(--orange)' }}
                        >
                          <FaRegEye/>
                        </button>
                        <button 
                          onClick={() => props.handleEdit(params.id)} 
                          style={{ background: 'var(--blue)' }}
                        >
                          <MdEdit/>
                        </button>
                        {props.btnsAdds?.map(b => 
                          <button 
                            onClick={() => b.handleClick(params.id)} 
                            style={{ background: b.color }}
                          >
                            <b.icon/>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td style={{padding: '1rem'}}>Sem registros encontrados</td>
                  <td></td>
                  <td></td>
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
