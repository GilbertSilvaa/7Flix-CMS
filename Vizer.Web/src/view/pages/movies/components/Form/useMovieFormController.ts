import { FormEvent, useState } from 'react';
import { Movie } from '../../../../../app/entities';
import { movieService } from '../../../../../app/services/movieService';

export function useMovieFormController() {
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
      const response = await movieService.create(formData)
      console.log(response)
    }
    catch (err) {
      console.error(err)
    }
  }

  return {
    handleSubmit: onSubmit,
    setFormValue,
    formData
  }
}
