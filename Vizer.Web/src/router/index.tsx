import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../view/layout';
import { DashboardView } from '../view/pages/dashboard';
import { MoviesView } from '../view/pages/movies';
import { SeriesView } from '../view/pages/series';

export function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>  
          <Route path='/' element={<DashboardView/>}/>
          <Route path='/movies' element={<MoviesView/>}/>
          <Route path='/series' element={<SeriesView/>}/>
        </Routes> 
      </Layout>
    </BrowserRouter>
  )
}
