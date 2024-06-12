import { FormEvent, useState } from 'react'
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
      if (serieEditId) return

      setIsLoading(prev => ({ ...prev, submit: true }))
      await serieService.create(formData)
      toast.success('Cadastro realizado com sucesso')
      setSuccessSubmit(true)
    }
    catch (err) {
      toast.error('Ops! Houve um erro')
    }
    finally {
      setIsLoading(prev => ({ ...prev, submit: false }))
    }
  }

  return {
    handleSubmit: onSubmit,
    isLoading,
    setFormValue,
    formData,
    successSubmit
  }
}