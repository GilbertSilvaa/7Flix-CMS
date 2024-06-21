import { useEffect, useState } from 'react'
import { Episode } from '../../../app/entities'
import { serieService } from '../../../app/services/serieService'

interface IToggleSerieFormParams {
  id?: string
  isReloadData?: boolean
  state: 'open' | 'close'
}

export function useEpisodesController(serieId: string) {
  const [serieTitle, setSerieTitle] = useState('')
  const [episodes, setEpisodes] = useState<Episode[]>([])
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
      const { title, episodes } = await serieService.get(serieId)
      setSerieTitle(title)
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
    serieTitle,
    isLoading,
    data: episodes.map(episodeTableContentAdapter),
    isEpisodeModalOpen,
    isEpisodeFormOpen,
    toggleEpisodeForm,
    toggleEpisodeModal
  }
}

function episodeTableContentAdapter(params: Episode) {
  return {
    id: params.id,
    title: params.title,
    dateCreated: params.createAt.toLocaleDateString(),
    dataAdds: [String(params.season), String(params.number)]
  }
}