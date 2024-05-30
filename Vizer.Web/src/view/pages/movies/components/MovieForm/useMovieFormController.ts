import { FormEvent, useEffect, useState } from 'react';
import { Movie } from '../../../../../app/entities';
import { useToast } from '../../../../../app/hooks/useToast';
import { movieService } from '../../../../../app/services/movieService';

interface IMovieFormControllerParams {
  movieEditId?: string
}

export function useMovieFormController({ movieEditId }: IMovieFormControllerParams) {
  const toast = useToast()

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)
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
      setIsLoadingSubmit(true)
      if (movieEditId) {
        await movieService.edit({id: movieEditId, ...formData})
        toast.success('Atualizado com sucesso')
      }
      else {
        await movieService.create(formData)
        toast.success('Cadastro realizado com sucesso')
      }
      setSuccessSubmit(true)
    }
    catch (err) {
      toast.error('Ops! Houve um erro')
    }
    finally {
      setIsLoadingSubmit(false)
    }
  }

  useEffect(() => {
    if (!movieEditId) return

    (async () => {
      try {
        setIsLoadingData(true)  
        setFormData(await movieService.get(movieEditId))
      }
      catch (err) {
        toast.error('Ops! Houve um erro')
      }
      finally {
        setIsLoadingData(false)
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieEditId])

  return {
    handleSubmit: onSubmit,
    setFormValue,
    isLoadingSubmit,
    isLoadingData,
    formData,
    successSubmit
  }
}
