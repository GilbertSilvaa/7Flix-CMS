import { FormEvent, useEffect, useState } from 'react';
import { Movie } from '../../../../../app/entities';
import { useToast } from '../../../../../app/hooks/useToast';
import { imdbService } from '../../../../../app/services/imbdService';
import { movieService } from '../../../../../app/services/movieService';

interface IMovieFormControllerParams {
  movieEditId?: string
}

export function useMovieFormController({ movieEditId }: IMovieFormControllerParams) {
  const toast = useToast()

  const [imdbId, setImdbId] = useState('')
  const [successSubmit, setSuccessSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState({
    submit: false,
    data: true,
    imdb: false
  })
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

  async function loadDataByImdb() {
    try {
      setIsLoading(prev => ({ ...prev, imdb: true }))
      setFormData(await imdbService.getMovie(imdbId))
    }
    catch (err) {
      toast.warning('Ops! Parâmetro inválido')
    }
    finally {
      setIsLoading(prev => ({ ...prev, imdb: false }))
    }
  }
  
  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    
    try {
      setIsLoading(prev => ({ ...prev, submit: true }))
      formData.review = parseFloat(formData.review!.toString())
      
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
      setIsLoading(prev => ({ ...prev, submit: false }))
    }
  }

  useEffect(() => {
    if (!movieEditId) {
      setIsLoading(prev => ({ ...prev, data: false }))
      return
    }

    (async () => {
      try {
        setIsLoading(prev => ({ ...prev, data: true }))
        setFormData(await movieService.get(movieEditId))
      }
      catch (err) {
        toast.error('Ops! Houve um erro')
      }
      finally {
        setIsLoading(prev => ({ ...prev, data: false }))
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieEditId])

  return {
    handleSubmit: onSubmit,
    setFormValue,
    isLoading,
    formData,
    successSubmit,
    imdbId,
    setImdbId,
    loadDataByImdb
  }
}
