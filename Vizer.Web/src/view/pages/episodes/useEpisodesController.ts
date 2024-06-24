import { useEffect, useState } from 'react'
import { Episode } from '../../../app/entities'
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
  const [episodeSelected, setEpisodeSelected] = useState<Episode>()
  const [isLoading, setIsLoading] = useState(false)
  const [isReload, setIsReload] = useState(false)
  const [isEpisodeModalOpen, setIsEpisodeModalOpen] = useState(false)
  const [isEpisodeFormOpen, setIsEpisodeFormOpen] = useState(false)
  const [episodeEditId, setEpisodeEditId] = useState<string>()

  async function toggleEpisodeModal(id?: string) { 
    if (id) {
      setIsEpisodeModalOpen(true)
      const response = await episodeService.get({ serieId, episodeId: id })
      setEpisodeSelected(response)
      return
    }
    setIsEpisodeModalOpen(false)
    setEpisodeSelected(undefined)
  }

  async function toggleEpisodeForm(params: IToggleSerieFormParams) {
    if (params.state === 'open') {
      setEpisodeEditId(params.id)
      setIsEpisodeFormOpen(true)
      return
    }
    setEpisodeEditId(undefined)
    setIsEpisodeFormOpen(false)
    setIsReload(!!params.isReloadData)
  }

  async function getEpisodes() {
    try {
      setIsReload(false)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReload])

  return {
    serieData,
    isLoading,
    data: episodes.map(episodeContentAdapter),
    episodeSelected,
    episodeEditId,
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