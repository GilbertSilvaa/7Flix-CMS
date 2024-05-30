import { VIDEO_FORMATS } from '../../../app/config/constants'
import { Video } from '../../../app/entities'
import { Input } from '../Input'
import { Select } from '../Select'
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
        value={videoData.url}
        onChange={e => setFormValue('url', e.target.value)}
      />
      
      <div className="double-input" style={{marginTop: '1rem'}}>
        <Select 
          label="Stream Format" 
          options={VIDEO_FORMATS.map(f => ({label: f, value: f}))} 
          isRequired
          value={videoData.streamFormat}
          onChange={e => setFormValue('streamFormat', e.target.value)}
        />

        <Input 
          label="Duração" 
          type="tel"
          placeholder="7200s"
          isRequired
          value={videoData.duration || ''}
          onChange={e => setFormValue('duration', parseInt(e.target.value))}
        />
      </div>
    </div>
  )
}
