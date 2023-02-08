import { HashRouter, Routes, Route } from 'react-router-dom'
import FindNoumes from './components/FindNoumes'
import Footer from './components/Footer'
import Home from './components/Home'
import NotFound from './components/NotFound'
import { QueriesContext } from './data/QueriesContext'

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/find-hotels' element={<FindNoumes />} />
    </Routes>
  )
};

export function WrappedApp() {
  return (
    <HashRouter>
      <QueriesContext.Provider value={'Hello'}>
        <App />
      </QueriesContext.Provider>
      <Footer />
    </HashRouter >
  )
}
