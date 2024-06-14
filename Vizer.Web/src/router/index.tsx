import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toast } from '../view/components/'
import { Layout } from '../view/layout'
import { 
  DashboardView, 
  EpisodesView, 
  MoviesView, 
  SeriesView 
} from '../view/pages'

export function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Toast/>
        <Routes>  
          <Route path="/" element={<DashboardView/>}/>
          <Route path="/movies" element={<MoviesView/>}/>
          <Route path="/series" element={<SeriesView/>}/>
          <Route path="/episodes/:serieId" element={<EpisodesView/>}/>
        </Routes> 
      </Layout>
    </BrowserRouter>
  )
}
