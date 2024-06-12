import { useEffect, useState } from 'react'
import { serieService } from '../../../app/services/serieService'
import { ISerieGetAllResponse } from '../../../app/services/serieService/getAll'

interface IToggleSerieFormParams {
  id?: string
  isReloadData?: boolean
  state: 'open' | 'close'
}

export function useSeriesController() {
  const [series, setSeries] = useState<ISerieGetAllResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSerieFormOpen, setIsSerieFormOpen] = useState(false)

  const toggleSerieForm = (params: IToggleSerieFormParams) =>
    setIsSerieFormOpen(params.state === 'open')

  async function getSeries() {
    try {
      setIsLoading(true)
      setSeries(await serieService.getAll())
    } 
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSeries()
  }, [])

  return {
    isLoading,
    data: series,
    isSerieFormOpen,
    toggleSerieForm
  }
}
