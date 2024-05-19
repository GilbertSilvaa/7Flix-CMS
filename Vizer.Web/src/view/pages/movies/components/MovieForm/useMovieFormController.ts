import { FormEvent, useState } from 'react';
import { Movie } from '../../../../../app/entities';
import { useToast } from '../../../../../app/hooks/useToast';
import { movieService } from '../../../../../app/services/movieService';

export function useMovieFormController() {
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [successSubmit, setSuccessSubmit] = useState(false)
  const [formData, setFormData] = useState<Partial<Movie>>({
    parentalRating: 0,
    video: {
      url: '',
      duration: 0, 
      streamFormat: ''
    }
  })

  const setFormValue = (
    field: keyof typeof formData,
    value: unknown
  ) => setFormData(prev => ({ ...prev, [field]: value }))
  
  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      await movieService.create(formData)
      toast.success('Cadastro realizado com sucesso')
      setSuccessSubmit(true)
    }
    catch (err) {
      toast.error('Ops! Houve um erro')
    }
    finally {
      setIsLoading(false)
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
