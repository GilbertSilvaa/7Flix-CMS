import {
  FormEvent,
  useEffect,
  useState
} from 'react'

export const VIDEO_TYPES = [
  'video/mp4', 
  'video/ogg', 
  'application/x-mpegURL'
] as const

interface IVideoAttrData {
  src: string
  type: typeof VIDEO_TYPES[number]
}

interface ILogPlayer {
  type: 'error' | 'status'
  message: string
  time: number
}

export function useVideoTestController(player: HTMLVideoElement | null) {
  const [playerLogs, setPlayerLogs] = useState<ILogPlayer[]>([]) 
  const [videoData, setVideoData] = useState<IVideoAttrData>({
    src: '',
    type: 'video/mp4' 
  })

  const setVideoAttr = (
    field: keyof typeof videoData,
    value: unknown
  ) => setVideoData(prev => ({ ...prev, [field]: value }))
  
  const clearPlayerLogs = () => setPlayerLogs([])
  
  function handlePlayVideo(e: FormEvent) {
    e.preventDefault()

    if (player?.children[0]) player?.removeChild(player?.children[0])

    const source = document.createElement('source')
    source.src = videoData.src
    source.type = videoData.type

    player?.appendChild(source)
    player?.load()
    player?.play()
  }

  useEffect(() => {
    player?.addEventListener('playing', () => {
      const log = handlePlayerStatus('Play', player?.currentTime)
      setPlayerLogs(prev => [...prev, log])
    })

    player?.addEventListener('pause', () => {
      const log = handlePlayerStatus('Pause', player?.currentTime)
      setPlayerLogs(prev => [...prev, log])
    })

    player?.addEventListener('error', e => {
      e.stopImmediatePropagation()
      const log = handlePlayerError(player?.error, player.currentTime)
      setPlayerLogs(prev => [...prev, log]) 
    })
  }, [player])

  return {
    setVideoAttr,
    handlePlayVideo,
    playerLogs,
    clearPlayerLogs
  }
}

function handlePlayerError(
  error: MediaError | null, 
  time: number
) : ILogPlayer 
{ 
  const message = error
    ? `Code: ${error?.code} | ${error?.message}`
    : 'Não foi possível reproduzir o vídeo'

  return {
    time,
    message, 
    type: 'error'
  }
}

function handlePlayerStatus(
  message: string, 
  time: number
) : ILogPlayer 
{
  return { 
    time,
    message,
    type: 'status'
  }
}