import { LuSaveAll } from 'react-icons/lu'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { Button, Input, ParentalRatingOptions, TextArea, VideoForm } from '../../../../components'
import styles from './styles.module.css'
import { useMovieFormController } from './useMovieFormController'

interface IMovieFormProps {
  toBack: (isSubmit?: boolean) => void
}

export function MovieForm({ toBack }: IMovieFormProps) {
  const { 
    setFormValue, 
    handleSubmit, 
    isLoading,
    formData, 
    successSubmit
  } = useMovieFormController()

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
        
        <h1>Cadastrar Filme</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>

        <div className="double-input">
          <Input 
            label="Título" 
            isRequired
            onChange={e => setFormValue('title', e.target.value)} 
          />
          <Input 
            label="Categoria" 
            placeholder="ação, aventura, drama, terror..."
            isRequired
            onChange={e => setFormValue('category', e.target.value)} 
          /> 
        </div>

        <TextArea 
          label="Sinopse"
          isRequired
          onChange={e => setFormValue('synopsis', e.target.value)} 
        />

        <div className="double-input">
          <Input 
            label="Nota Review" 
            type="tel"
            placeholder="7.5"
            isRequired
            onChange={e => setFormValue('review', parseFloat(e.target.value))} 
          />  
          <Input 
            label="Ano Lançamento" 
            type="tel"
            placeholder="2020"
            isRequired
            onChange={e => setFormValue('releaseYear', e.target.value)} 
          /> 
        </div>
        <ParentalRatingOptions 
          onSelect={option => setFormValue('parentalRating', option)}
        />

        <div className="double-input">
          <Input 
            label="Poster (URL)" 
            placeholder="https://www.imagem.jpg"
            isRequired
            onChange={e => setFormValue('poster', e.target.value)} 
          />
          <Input 
            label="Banner (URL)" 
            placeholder="https://www.imagem.jpg"
            isRequired
            onChange={e => setFormValue('banner', e.target.value)} 
          />
        </div>

        <VideoForm 
          videoData={formData.video!}
          handleChangeVideoData={data => setFormValue('video', data)}
        />

        <div style={{ marginTop: '1rem' }}>
          <Button color="var(--green)" isLoading={isLoading}>
            <LuSaveAll/>
            <span>Cadastrar</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
