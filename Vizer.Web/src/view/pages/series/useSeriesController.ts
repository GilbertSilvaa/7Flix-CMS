import { useEffect, useState } from 'react'
import { serieService } from '../../../app/services/serieService'
import { ISerieGetAllResponse } from '../../../app/services/serieService/getAll'

export function useSeriesController() {
  const [series, setSeries] = useState<ISerieGetAllResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
    data: series
  }
}
