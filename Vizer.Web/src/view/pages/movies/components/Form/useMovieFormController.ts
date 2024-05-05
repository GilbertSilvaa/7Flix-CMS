import { FormEvent, useState } from 'react';
import { Movie } from '../../../../../app/entities';
import { useToast } from '../../../../../app/hooks/useToast';
import { movieService } from '../../../../../app/services/movieService';

export function useMovieFormController() {
  const toast = useToast()

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
      await movieService.create(formData)
      toast.success('Cadastro realizado com sucesso')
      setSuccessSubmit(true)
    }
    catch (err) {
      toast.error('Ops! Houve um erro')
    }
  }

  return {
    handleSubmit: onSubmit,
    setFormValue,
    formData,
    successSubmit
  }
}
