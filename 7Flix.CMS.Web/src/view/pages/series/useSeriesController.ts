import { useEffect, useState } from 'react'
import { Serie } from '../../../app/entities'
import { serieService } from '../../../app/services/serieService'
import { ISerieGetAllResponse } from '../../../app/services/serieService/getAll'

interface IToggleSerieFormParams {
  id?: string
  isReloadData?: boolean
  state: 'open' | 'close'
}

export function useSeriesController() {
  const [series, setSeries] = useState<ISerieGetAllResponse[]>([])
  const [serieSelected, setSerieSelected] = useState<Serie>()
  const [isReload, setIsReload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSerieFormOpen, setIsSerieFormOpen] = useState(false)
  const [isSerieModalOpen, setIsSerieModalOpen] = useState(false)
  const [serieEditId, setSerieEditId] = useState<string>()

  async function toggleSerieModal(id?: string) {
    if (id) {
      setIsSerieModalOpen(true)
      setSerieSelected(await serieService.get(id))
      return
    }
    setIsSerieModalOpen(false)
    setSerieSelected(undefined)
  }

  function toggleSerieForm (params: IToggleSerieFormParams) {
    if (params.state === 'open') {
      setSerieEditId(params.id)
      setIsSerieFormOpen(true)
      return
    }
    setSerieEditId(undefined)
    setIsSerieFormOpen(false)
    setIsReload(!!params.isReloadData)
  }

  async function getSeries() {
    try {
      setIsReload(false)      
      setIsLoading(true)
      setSeries(await serieService.getAll())
    } 
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSeries()
  }, [isReload])

  return {
    isLoading,
    data: series,
    serieSelected,
    serieEditId,
    isSerieFormOpen,
    isSerieModalOpen,
    toggleSerieForm,
    toggleSerieModal
  }
}
