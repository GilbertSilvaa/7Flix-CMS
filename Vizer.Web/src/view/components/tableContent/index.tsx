import { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { MdEdit, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import styles from './styles.module.css';

interface ITableContentData {
  id: string
  title: string
  registrationDate: Date
}

interface ITableContentProps {
  data: ITableContentData[]
  handleView: (id: string) => void
  handleEdit: (id: string) => void
}

export function TableContent({ data, handleEdit, handleView }: ITableContentProps) {
  const [currentPagination, setCurrentPagination] = useState(0);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice((currentPagination * 6), ((currentPagination * 6) + 6))
            .map((params, index) => (
              <tr key={index}>
                <td>{params.title}</td>
                <td>{params.registrationDate.toLocaleDateString()}</td>
                <td>
                  <div className={styles.actions}>
                    <button 
                      onClick={() => handleView(params.id)} 
                      style={{ background: 'var(--orange)' }}
                    >
                      <FaRegEye/>
                    </button>
                    <button 
                      onClick={() => handleEdit(params.id)} 
                      style={{ background: 'var(--blue)' }}
                    >
                      <MdEdit/>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className={styles.footer}>
          <button 
            disabled={currentPagination === 0}
            onClick={() => setCurrentPagination(prev => prev-1)}
          >
            <MdNavigateBefore/>
          </button>
          <span>{currentPagination + 1} de {Math.ceil(data.length/6)}</span>
          <button 
            disabled={currentPagination + 1 === Math.ceil(data.length/6)}
            onClick={() => setCurrentPagination(prev => prev+1)}
          >
            <MdNavigateNext/>
          </button>
      </div>
    </div>
  )
}
