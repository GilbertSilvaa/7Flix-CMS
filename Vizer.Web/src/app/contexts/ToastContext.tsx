import { createContext, ReactNode, useState } from 'react'

interface IToastData {
  type: 'success' | 'error' | 'warning'
  message: string
}

interface IToastProviderValue {
  success: (message: string) => void
  error: (message: string) => void
  warning: (message: string) => void
  data?: IToastData
}

export const ToastContext = createContext({} as IToastProviderValue)

interface IToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: IToastProviderProps) {
  const [dataToast, setDataToast] = useState<IToastData>()

  function handleOpenToast(data: IToastData) {
    if (dataToast) return
    setDataToast(data)
    setTimeout(() => setDataToast(undefined), 3000)
  }

  const toastProvideValue: IToastProviderValue = {
    data: dataToast,
    error: message => handleOpenToast({type: 'error', message}),
    success: message => handleOpenToast({type: 'success', message}),
    warning: message => handleOpenToast({type: 'warning', message})
  }

  return (
    <ToastContext.Provider value={toastProvideValue}>
      { children }
    </ToastContext.Provider>
  )
}
