import { HashRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './components/Home'
import NotFound from './components/NotFound'
import SearchBar from './components/SearchBar'

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/find-hotels' element={<SearchBar />} />
    </Routes>
  )
};

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
      <Footer />
    </HashRouter>
  )
}
