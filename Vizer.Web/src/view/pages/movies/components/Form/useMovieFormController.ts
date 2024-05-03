import { FormEvent, useState } from 'react';
import { Movie } from '../../../../../app/entities';

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
    console.log(formData)
  }

  return {
    handleSubmit: onSubmit,
    setFormValue,
    formData
  }
}
