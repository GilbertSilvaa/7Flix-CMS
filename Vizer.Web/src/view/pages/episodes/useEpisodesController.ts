import { useEffect, useState } from 'react'
import { Episode } from '../../../app/entities'
import { serieService } from '../../../app/services/serieService'

export function useEpisodesController(serieId: string) {
  const [serieTitle, setSerieTitle] = useState('')
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function getData() {
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
    getData()
  }, [])

  return {
    serieTitle,
    isLoading,
    data: episodes.map(episodeTableContentAdapter)
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