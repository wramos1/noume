import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
};

export function WrappedApp() {
  return (
    <HashRouter>
      <Navbar />
      <App />
    </HashRouter>
  )
}
