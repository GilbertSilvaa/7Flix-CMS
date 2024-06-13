import { LuSaveAll } from 'react-icons/lu'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { Button, Input, ParentalRatingOptions, TextArea } from '../../../../components'
import styles from './styles.module.css'
import { useSerieFormController } from './useSerieFormController'

interface ISerieFormProps {
  serieId?: string
  toBack: (isSubmit?: boolean) => void
}

export function SerieForm({ serieId, toBack }: ISerieFormProps) {
  const { 
    formData, 
    isLoading, 
    setFormValue,
    handleSubmit,
    successSubmit
  } = useSerieFormController({})

  if (successSubmit) toBack(true)

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <button 
          className={styles.btnBack} 
          onClick={() => toBack(false)}
        >
          <RiArrowGoBackLine/>
        </button>
        
        <h1>{serieId ? 'Editar Série' : 'Cadastrar Série'}</h1>
      </div>

      <form  onSubmit={handleSubmit}>
        <fieldset className={styles.form} disabled={isLoading.submit}>
          <div className="double-input">
            <Input 
              label="Título" 
              isRequired
              value={serieId && formData.title}
              onChange={e => setFormValue('title', e.target.value)} 
            />
            <Input 
              label="Categoria" 
              placeholder="ação, aventura, drama, terror..."
              isRequired
              value={serieId && formData.category}
              onChange={e => setFormValue('category', e.target.value)} 
            /> 
          </div>

          <TextArea 
            label="Sinopse"
            isRequired
            value={serieId && formData.synopsis}
            onChange={e => setFormValue('synopsis', e.target.value)} 
          />

          <div className="double-input">
            <Input 
              label="Ano Lançamento" 
              type="tel"
              placeholder="2020"
              isRequired
              value={serieId && formData.releaseYear}
              onChange={e => setFormValue('releaseYear', e.target.value)} 
            /> 
            <ParentalRatingOptions 
              defaultSeleted={formData.parentalRating}
              onSelect={option => setFormValue('parentalRating', option)}
            />  
          </div>
          
          <div className="double-input">
            <Input 
              label="Nota Review" 
              type="tel"
              placeholder="7.5"
              isRequired
              value={serieId && formData.review}
              onChange={e => setFormValue('review', parseFloat(e.target.value))} 
            /> 
            <Input 
              label="Qtde. Temporadas" 
              type="tel"
              placeholder="2"
              isRequired
              value={serieId && formData.numberSeasons}
              onChange={e => setFormValue('numberSeasons', parseFloat(e.target.value))} 
            />
          </div>

          <div className="double-input">
            <Input 
              label="Poster (URL)" 
              placeholder="https://www.imagem.jpg"
              isRequired
              value={serieId && formData.poster}
              onChange={e => setFormValue('poster', e.target.value)} 
            />
            <Input 
              label="Banner (URL)" 
              placeholder="https://www.imagem.jpg"
              isRequired
              value={serieId && formData.banner}
              onChange={e => setFormValue('banner', e.target.value)} 
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <Button color="var(--green)" isLoading={isLoading.submit}>
              <LuSaveAll/>
              <span>{serieId ? 'Salvar' : 'Cadastrar'}</span>
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
