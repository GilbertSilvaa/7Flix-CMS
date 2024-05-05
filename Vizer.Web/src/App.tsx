import { ToastProvider } from './app/contexts/ToastContext'
import { Router } from './router'

const App = () => (
  <ToastProvider>
    <Router/>
  </ToastProvider>
)

export default App
