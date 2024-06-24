import { FormEvent, useEffect, useState } from 'react'

interface ILogPlayer {
  type: 'error' | 'status'
  message: string
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
      const log = {type: 'status', message: 'Play'} as ILogPlayer
      setPlayerLogs(prev => [...prev, log])
    })

    player?.addEventListener('pause', () => {
      const log = {type: 'status', message: 'Pause'} as ILogPlayer
      setPlayerLogs(prev => [...prev, log])
    })

    player?.addEventListener('error', e => {
      e.stopImmediatePropagation()
      setPlayerLogs(prev => [...prev, handlePlayerError(player?.error)]) 
    })
  }, [player])

  return {
    setUrlVideo,
    handlePlayVideo,
    playerLogs,
    clearPlayerLogs
  }
}

function handlePlayerError(error: MediaError | null) { 
  const message = error
    ? `Code: ${error?.code} | ${error?.message}`
    : 'Não foi possível reproduzir o vídeo'

  return {type: 'error', message} as ILogPlayer
}