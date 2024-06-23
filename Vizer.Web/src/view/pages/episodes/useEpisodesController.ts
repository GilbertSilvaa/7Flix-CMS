import { useEffect, useState } from 'react'
import { episodeService } from '../../../app/services/episodeService'
import { IEpisodeData } from '../../../app/services/episodeService/getAll'

interface ISerieData {
  title: string
  numberSeasons: number
}

interface IToggleSerieFormParams {
  id?: string
  isReloadData?: boolean
  state: 'open' | 'close'
}

export function useEpisodesController(serieId: string) {
  const [serieData, setSerieData] = useState<ISerieData>()
  const [episodes, setEpisodes] = useState<IEpisodeData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEpisodeModalOpen, setIsEpisodeModalOpen] = useState(false)
  const [isEpisodeFormOpen, setIsEpisodeFormOpen] = useState(false)

  async function toggleEpisodeModal(id?: string) { 
    console.log(id)
    setIsEpisodeModalOpen(true)
  }

  async function toggleEpisodeForm(params: IToggleSerieFormParams) {
    if (params.state === 'open') {
      setIsEpisodeFormOpen(true)
      return
    }
    setIsEpisodeFormOpen(false)
  }

  async function getEpisodes() {
    try {
      setIsLoading(true)
      const { serieTitle, numberSeasons, episodes } = await episodeService.getAll(serieId)
      setSerieData({ title: serieTitle, numberSeasons })
      setEpisodes(episodes)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getEpisodes()
  }, [])

  return {
    serieData,
    isLoading,
    data: episodes.map(episodeContentAdapter),
    isEpisodeModalOpen,
    isEpisodeFormOpen,
    toggleEpisodeForm,
    toggleEpisodeModal
  }
}

function episodeContentAdapter(params: IEpisodeData) {
  return {
    id: params.id,
    title: params.title,
    dateCreated: params.dateCreated,
    dataAdds: [String(params.season), String(params.episode)]
  }
}