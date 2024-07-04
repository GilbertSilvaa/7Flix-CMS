import { FormEvent, useState } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { VIDEO_TYPES } from '../../../app/config/constants'

interface IVideoAttrData {
  src: string
  type: typeof VIDEO_TYPES[number]
}

interface ILogPlayer {
  type: 'error' | 'status'
  message: string
  time: number
}

export function useVideoTestController(player: HTMLDivElement | null) {
  const [playerLogs, setPlayerLogs] = useState<ILogPlayer[]>([]) 
  const [videoData, setVideoData] = useState<IVideoAttrData>({
    src: '',
    type: 'video/mp4' 
  })

  const setVideoAttr = (
    field: keyof typeof videoData,
    value: unknown
  ) => setVideoData(prev => ({...prev, [field]: value}))
  
  const clearPlayerLogs = () => setPlayerLogs([])
  
  function handlePlayVideo(e: FormEvent) {
    e.preventDefault()

    if (player?.children[0]) player?.removeChild(player?.children[0])

    const videoElement = document.createElement('video-js')
    videoElement.classList.add('vjs-big-play-centered')
    player?.appendChild(videoElement)

    const options = {
      fluid: true,
      autoplay: true,
      controls: true,
      responsive: true,
      sources: [{src: videoData.src, type: videoData.type}]
    }

    const video = videojs(videoElement, options)

    video.on('error', () => {
      const log = playerErrorLog(video.error_ as MediaError, video.currentTime())
      setPlayerLogs(prev => [...prev, log])
    })

    video.on('playing', () => {
      const log = playerStatusLog('Play', video.currentTime())
      setPlayerLogs(prev => [...prev, log])
    })

    video.on('pause', () => {
      const log = playerStatusLog('Pause', video.currentTime())
      setPlayerLogs(prev => [...prev, log])
    })
  }

  return {
    setVideoAttr,
    handlePlayVideo,
    clearPlayerLogs,
    playerLogs
  }
}

function playerErrorLog(error: MediaError, time?: number) : ILogPlayer { 
  const message = error
    ? `Code: ${error?.code} | ${error?.message}`
    : 'Não foi possível reproduzir o vídeo'

  return {
    message, 
    type: 'error',
    time: time ?? 0
  }
}

function playerStatusLog(message: string, time?: number) : ILogPlayer {
  return {
    message,
    type: 'status',
    time: time ?? 0
  }
}