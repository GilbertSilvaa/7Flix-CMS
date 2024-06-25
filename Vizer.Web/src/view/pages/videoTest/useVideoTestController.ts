import { FormEvent, useEffect, useState } from 'react'

interface ILogPlayer {
  type: 'error' | 'status'
  message: string
  time: number
}

export function useVideoTestController(player: HTMLVideoElement | null) {
  const [playerLogs, setPlayerLogs] = useState<ILogPlayer[]>([]) 
  const [urlVideo, setUrlVideo] = useState('')
  
  const clearPlayerLogs = () => setPlayerLogs([])
  
  function handlePlayVideo(e: FormEvent) {
    e.preventDefault()

    player?.setAttribute('src', urlVideo)
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
    setUrlVideo,
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