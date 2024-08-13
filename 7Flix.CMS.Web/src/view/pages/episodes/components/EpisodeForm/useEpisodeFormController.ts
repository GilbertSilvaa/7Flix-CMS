import { FormEvent, useEffect, useState } from 'react'
import { Episode } from '../../../../../app/entities'
import { useToast } from '../../../../../app/hooks/useToast'
import { episodeService } from '../../../../../app/services/episodeService'

interface IEpisodeFormControllerParams {
  serieId: string
  episodeEditId?: string
}

export function useEpisodeFormController(params: IEpisodeFormControllerParams) {
  const toast = useToast()

  const [isLoading, setIsLoading] = useState({
    submit: false,
    data: true
  })
  const [formData, setFormData] = useState<Partial<Episode>>({
    parentalRating: 0,
    video: {
      url: '',
      duration: 0, 
      streamFormat: ''
    }
  })
  const [successSubmit, setSuccessSubmit] = useState(false)

  const setFormValue = (
    field: keyof typeof formData,
    value: unknown
  ) => setFormData(prev => ({ ...prev, [field]: value }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    
    try {
      setIsLoading(prev => ({ ...prev, submit: true }))
      
      if (params.episodeEditId) {
        await episodeService.edit({ 
          id: params.episodeEditId,  
          idSerie: params.serieId,
          ...formData
        })
        toast.success('Atualizado com sucesso')
      }
      else {
        await episodeService.create({ idSerie: params.serieId, ...formData })
        toast.success('Cadastro realizado com sucesso')
      }
      
      setSuccessSubmit(true)
    }
    catch (err) {
      toast.error('Ops! Houve um erro')
    }
    finally {
      setIsLoading(prev => ({ ...prev, submit: false }))
    }
  }

  useEffect(() => {
    if (!params.episodeEditId) {
      setIsLoading(prev => ({ ...prev, data: false }))
      return
    }

    (async () => {
      try {
        setIsLoading(prev => ({ ...prev, data: true }))
        setFormData(await episodeService.get({ serieId: 
          params.serieId, 
          episodeId: params.episodeEditId! 
        }))
      }
      catch (err) {
        toast.error('Ops! Houve um erro')
      }
      finally {
        setIsLoading(prev => ({ ...prev, data: false }))
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.episodeEditId])

  return {
    handleSubmit: onSubmit,
    setFormValue,
    isLoading,
    formData,
    successSubmit
  }
}