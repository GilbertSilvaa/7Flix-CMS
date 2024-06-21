import { FormEvent, useState } from 'react'
import { Episode } from '../../../../../app/entities'
import { useToast } from '../../../../../app/hooks/useToast'
import { episodeService } from '../../../../../app/services/episodeService'

interface IEpisodeFormControllerParams {
  episodeEditId?: string
}

export function useEpisodeFormController({ episodeEditId }: IEpisodeFormControllerParams) {
  console.log(episodeEditId)
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
      
      await episodeService.create(formData)
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
    setFormValue,
    isLoading,
    formData,
    successSubmit
  }
}