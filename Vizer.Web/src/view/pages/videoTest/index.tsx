import { useRef } from 'react'
import { AiOutlineClear } from 'react-icons/ai'
import { IoPlay } from 'react-icons/io5'
import { Button, IconButton, Input } from '../../components'
import styles from './styles.module.css'
import { useVideoTestController } from './useVideoTestController'

export function VideoTestView() {
  const player = useRef<HTMLVideoElement>(null)
  
  const { 
    setUrlVideo,
    handlePlayVideo,
    playerLogs,
    clearPlayerLogs
  } = useVideoTestController(player.current)

  return (
    <div className={styles.content}>
      <div className="header-page">
        <h1>Teste de Video</h1>
      </div>
      <div className={styles.container}>
        <form className={styles.search} onSubmit={handlePlayVideo}>
          <Input 
            label='Video (URL)' 
            placeholder='https://www.cdn.com/vod/video.mp4'
            onChange={e => setUrlVideo(e.target.value)}
            isRequired
          />
          <Button color='var(--green)'>
            <IoPlay/> Play
          </Button>
        </form>  

        <div className={styles.videoContent}>
          <video ref={player} src="" controls>
          </video>

          <section className={styles.logsContent}>
            <h4>Logs</h4>

            <div className={styles.logs}>
              {!playerLogs.length && <div className={styles.log + ' ' + styles.info}><span>Sem registros</span></div>}

              {playerLogs.map((log, index) => (
                log.type === 'error'
                  ? <div key={index} className={styles.log + ' ' + styles.error}><span>{log.message}</span></div>
                  : <div key={index} className={styles.log + ' ' + styles.info}><span>{log.message}</span></div>
              ))}
            </div>

            <div className={styles.clearBtn}>
              <IconButton 
                color='var(--blue-2)' 
                icon={AiOutlineClear} 
                onClick={clearPlayerLogs}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}