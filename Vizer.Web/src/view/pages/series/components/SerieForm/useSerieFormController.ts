import { FormEvent, useEffect, useState } from 'react'
import { Serie } from '../../../../../app/entities'
import { useToast } from '../../../../../app/hooks/useToast'
import { serieService } from '../../../../../app/services/serieService'

interface ISerieFormControllerParams {
  serieEditId?: string
}

export function useSerieFormController({ serieEditId }: ISerieFormControllerParams) {
  const toast = useToast()

  const [isLoading, setIsLoading] = useState({ submit: false, data: true })
  const [formData, setFormData] = useState<Partial<Serie>>({
    parentalRating: 0,
    numberSeasons: 1,
    episodes: []
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
      formData.numberSeasons = parseFloat(formData.numberSeasons?.toString()!)
      formData.review = parseFloat(formData.review?.toString()!)

      if (serieEditId) {
        await serieService.edit({id: serieEditId, ...formData})
        toast.success('Atualizado com sucesso')
      }
      else {
        await serieService.create(formData)
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
    if (!serieEditId) {
      setIsLoading(prev => ({ ...prev, data: false }))
      return
    }

    (async () => {
      try {
        setIsLoading(prev => ({ ...prev, data: true }))
        setFormData(await serieService.get(serieEditId))
      }
      catch (err) {
        toast.error('Ops! Houve um erro')
      }
      finally {
        setIsLoading(prev => ({ ...prev, data: false }))
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serieEditId])

  return {
    handleSubmit: onSubmit,
    isLoading,
    setFormValue,
    formData,
    successSubmit
  }
}