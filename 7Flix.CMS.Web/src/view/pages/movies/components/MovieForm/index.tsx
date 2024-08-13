import { LuSaveAll } from 'react-icons/lu'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { SlReload } from 'react-icons/sl'
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
    isLoading,
    formData, 
    successSubmit,
    imdbId,
    setImdbId,
    loadDataByImdb
  } = useMovieFormController({ movieEditId: movieId })

  if (successSubmit) toBack(true)

  if (isLoading.data) return (
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
        <fieldset className={styles.formContent} disabled={isLoading.submit}>
          <section className={styles.search}>
            <Input 
              label="ID Imdb"
              onChange={e => setImdbId(e.target.value)}
            />
            <div>
              <Button 
                type="button"
                color="var(--blue-2)" 
                onClick={loadDataByImdb}
                isLoading={isLoading.imdb}
                disabled={!imdbId.length || isLoading.imdb}
              >
                <SlReload/>  
                <span>Carregar</span>          
              </Button>
            </div>
          </section>
          <hr />

          <div className="double-input">
            <Input 
              label="Título" 
              isRequired
              value={formData.title}
              onChange={e => setFormValue('title', e.target.value)} 
            />
            <Input 
              label="Categoria" 
              placeholder="ação, aventura, drama, terror..."
              isRequired
              value={formData.category}
              onChange={e => setFormValue('category', e.target.value)} 
            /> 
          </div>

          <TextArea 
            label="Sinopse"
            isRequired
            value={formData.synopsis}
            onChange={e => setFormValue('synopsis', e.target.value)} 
          />

          <div className="double-input">
            <Input 
              label="Ano Lançamento" 
              type="tel"
              placeholder="2020"
              isRequired
              value={formData.releaseYear}
              onChange={e => setFormValue('releaseYear', e.target.value)} 
            /> 
            <ParentalRatingOptions 
              defaultSeleted={formData.parentalRating}
              onSelect={option => setFormValue('parentalRating', option)}
            />
            <Input 
              label="Nota Review" 
              type="tel"
              placeholder="7.5"
              isRequired
              value={formData.review}
              onChange={e => setFormValue('review', e.target.value)} 
            />  
          </div>
          
          <div className="double-input">
            <Input 
              label="Poster (URL)" 
              placeholder="https://www.imagem.jpg"
              isRequired
              value={formData.poster}
              onChange={e => setFormValue('poster', e.target.value)} 
            />
            <Input 
              label="Banner (URL)" 
              placeholder="https://www.imagem.jpg"
              isRequired
              value={formData.banner}
              onChange={e => setFormValue('banner', e.target.value)} 
            />
          </div>

          <VideoForm 
            videoData={formData.video!}
            handleChangeVideoData={data => setFormValue('video', data)}
          />

          <div style={{ marginTop: '1rem' }}>
            <Button color="var(--green)" isLoading={isLoading.submit}>
              <LuSaveAll/>
              <span>{movieId ? 'Salvar' : 'Cadastrar'}</span>
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
