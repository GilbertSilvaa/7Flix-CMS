import { LuSaveAll } from 'react-icons/lu'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { Button, Input, Loading, ParentalRatingOptions, TextArea, VideoForm } from '../../../../components'
import styles from './styles.module.css'
import { useMovieFormController } from './useMovieFormController'

interface IMovieFormProps {
  movieId?: string
  toBack: (isSubmit?: boolean) => void
}

export function MovieForm({ movieId, toBack }: IMovieFormProps) {
  const { 
    setFormValue, 
    handleSubmit, 
    isLoadingSubmit,
    isLoadingData,
    formData, 
    successSubmit
  } = useMovieFormController({ movieEditId: movieId })

  if (successSubmit) toBack(true)

  if (isLoadingData) return (
    <div className={styles.content}>
      <div className={styles.header}>
        <button 
          className={styles.btnBack} 
          onClick={() => toBack(false)}
        >
          <RiArrowGoBackLine/>
        </button>
        
        <h1>Editar Filme</h1>
      </div>

      <div className={styles.loading}>
        <Loading size={1.4}/>
      </div>
    </div>
  )

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <button 
          className={styles.btnBack} 
          onClick={() => toBack(false)}
        >
          <RiArrowGoBackLine/>
        </button>
        
        <h1>{movieId ? 'Editar Filme' : 'Cadastrar Filme'}</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>

        <div className="double-input">
          <Input 
            label="Título" 
            isRequired
            value={movieId && formData.title}
            onChange={e => setFormValue('title', e.target.value)} 
          />
          <Input 
            label="Categoria" 
            placeholder="ação, aventura, drama, terror..."
            isRequired
            value={movieId && formData.category}
            onChange={e => setFormValue('category', e.target.value)} 
          /> 
        </div>

        <TextArea 
          label="Sinopse"
          isRequired
          value={movieId && formData.synopsis}
          onChange={e => setFormValue('synopsis', e.target.value)} 
        />

        <div className="double-input">
          <Input 
            label="Nota Review" 
            type="tel"
            placeholder="7.5"
            isRequired
            value={movieId && formData.review}
            onChange={e => setFormValue('review', parseFloat(e.target.value))} 
          />  
          <Input 
            label="Ano Lançamento" 
            type="tel"
            placeholder="2020"
            isRequired
            value={movieId && formData.releaseYear}
            onChange={e => setFormValue('releaseYear', e.target.value)} 
          /> 
        </div>
        <ParentalRatingOptions 
          defaultSeleted={formData.parentalRating}
          onSelect={option => setFormValue('parentalRating', option)}
        />

        <div className="double-input">
          <Input 
            label="Poster (URL)" 
            placeholder="https://www.imagem.jpg"
            isRequired
            value={movieId && formData.poster}
            onChange={e => setFormValue('poster', e.target.value)} 
          />
          <Input 
            label="Banner (URL)" 
            placeholder="https://www.imagem.jpg"
            isRequired
            value={movieId && formData.banner}
            onChange={e => setFormValue('banner', e.target.value)} 
          />
        </div>

        <VideoForm 
          videoData={formData.video!}
          handleChangeVideoData={data => setFormValue('video', data)}
        />

        <div style={{ marginTop: '1rem' }}>
          <Button color="var(--green)" isLoading={isLoadingSubmit}>
            <LuSaveAll/>
            <span>{movieId ? 'Salvar' : 'Cadastrar'}</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
