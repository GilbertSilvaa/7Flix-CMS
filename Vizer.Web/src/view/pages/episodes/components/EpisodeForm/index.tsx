import { LuSaveAll } from 'react-icons/lu'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { Button, Input, ParentalRatingOptions, Select, TextArea, VideoForm } from '../../../../components'
import styles from './styles.module.css'
import { useEpisodeFormController } from './useEpisodeFormController'

interface IEpisodeFormProps {
  episodeId?: string
  toBack: (isSubmit?: boolean) => void
}

export function EpisodeForm({ toBack, episodeId }: IEpisodeFormProps) {
  const { 
    setFormValue, 
    handleSubmit, 
    isLoading,
    formData, 
    successSubmit
  } = useEpisodeFormController({ episodeEditId: episodeId })

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
        
        <h1>Cadastrar Episódio</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.formContent}>
          <div className="double-input">
            <Select 
              label="Temporada" 
              isRequired
              value={episodeId && formData.season}
              onChange={e => setFormValue('season', e.target.value)} 
              options={[]}
            />
            <Input 
              label="Episódio" 
              isRequired
              value={episodeId && formData.number}
              onChange={e => setFormValue('number', e.target.value)} 
            />
          </div>
          <Input 
            label="Título" 
            isRequired
            value={episodeId && formData.title}
            onChange={e => setFormValue('title', e.target.value)} 
          />
          <TextArea 
            label="Sinopse"
            isRequired
            value={episodeId && formData.synopsis}
            onChange={e => setFormValue('synopsis', e.target.value)} 
          />

          <div className="double-input">
            <Input 
              label="Ano Lançamento" 
              type="tel"
              placeholder="2020"
              isRequired
              value={episodeId && formData.releaseYear}
              onChange={e => setFormValue('releaseYear', e.target.value)} 
            /> 
            <ParentalRatingOptions 
              defaultSeleted={formData.parentalRating}
              onSelect={option => setFormValue('parentalRating', option)}
            /> 
          </div>

          <div className="double-input">
            <Input 
              label="Poster (URL)" 
              placeholder="https://www.imagem.jpg"
              isRequired
              value={episodeId && formData.poster}
              onChange={e => setFormValue('poster', e.target.value)} 
            />
            <Input 
              label="Banner (URL)" 
              placeholder="https://www.imagem.jpg"
              isRequired
              value={episodeId && formData.banner}
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
              <span>{episodeId ? 'Salvar' : 'Cadastrar'}</span>
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}