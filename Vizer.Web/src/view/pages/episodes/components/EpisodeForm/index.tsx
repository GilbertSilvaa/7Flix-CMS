import { LuSaveAll } from 'react-icons/lu'
import { RiArrowGoBackLine } from 'react-icons/ri'
import {
  Button,
  Input,
  Loading,
  ParentalRatingOptions,
  Select,
  TextArea,
  VideoForm
} from '../../../../components'
import styles from './styles.module.css'
import { useEpisodeFormController } from './useEpisodeFormController'

interface IEpisodeFormProps {
  episodeId?: string
  serieData: {
    id: string
    numberSeasons?: number 
  }
  toBack: (isSubmit?: boolean) => void
}

export function EpisodeForm({ toBack, episodeId, serieData }: IEpisodeFormProps) {
  serieData.numberSeasons ??= 1

  const seasonsSelectOptions = []
  for (let i = 1; i <= serieData.numberSeasons; i++) 
    seasonsSelectOptions.push({ value: i.toString(), label: `Temporada ${i}` })

  const { 
    setFormValue, 
    handleSubmit, 
    isLoading,
    formData, 
    successSubmit
  } = useEpisodeFormController({ 
    episodeEditId: episodeId, 
    serieId: serieData.id 
  })

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
        
        <h1>Editar Episódio</h1>
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
        
        <h1>{episodeId ? 'Editar' : 'Cadastrar'} Episódio</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.formContent} disabled={isLoading.submit}>
          <div className="double-input">
            <Select 
              label="Temporada" 
              isRequired
              value={episodeId && formData.season}
              onChange={e => setFormValue('season', e.target.value)} 
              options={seasonsSelectOptions}
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