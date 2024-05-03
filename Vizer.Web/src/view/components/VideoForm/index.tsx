import { Video } from '../../../app/entities'
import { Input } from '../Input'
import styles from './styles.module.css'

interface IVideoFormProps {
  handleChangeVideoData: (data: Video) => void
  videoData: Video
}

export function VideoForm({ 
  videoData,
  handleChangeVideoData
}: IVideoFormProps) {

  const setFormValue = (
    field: keyof typeof videoData,
    value: unknown
  ) => handleChangeVideoData({ ...videoData, [field]: value })
  
  return (
    <div className={styles.content}>
      <h4>Video</h4>
      <hr />
      <Input 
        label="URL" 
        placeholder="https://cdn.example.com/video.mp4"
        isRequired
        onChange={e => setFormValue('url', e.target.value)}
      />
      
      <div className="double-input" style={{marginTop: '1rem'}}>
        <Input 
          label="Stream Format" 
          placeholder="MP4"
          isRequired
          onChange={e => setFormValue('streamFormat', e.target.value)}
        />

        <Input 
          label="Duração" 
          type="tel"
          placeholder="7200s"
          isRequired
          onChange={e => setFormValue('duration', parseInt(e.target.value))}
        />
      </div>
    </div>
  )
}
