import { useState } from 'react'
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
  const [selectedLocation, setSelectedLocation] = useState({ index: null, name: '', coordinates: { lat: null, long: null } });
  const [checkIn, setCheckIn] = useState({ day: null, month: null, year: null, strDate: '' });
  const [checkOut, setCheckOut] = useState({ day: null, month: null, year: null, strDate: '' });
  const [rooms, setRooms] = useState([{ adults: 2, children: [{ age: 0 }] }]);
  const [noumes, setNoumes] = useState([]);
  const [term, setTerm] = useState('');

  return (
    <HashRouter>
      <QueriesContext.Provider value={{ rooms, setRooms, selectedLocation, setSelectedLocation, checkIn, setCheckIn, checkOut, setCheckOut, noumes, setNoumes, term, setTerm }}>
        <App />
      </QueriesContext.Provider>
      <Footer />
    </HashRouter >
  )
}
