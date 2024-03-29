import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import FindNoumes from './components/FindNoumes'
import Footer from './components/Footer'
import Home from './components/Home'
import MyNoumes from './components/MyNoumes'
import NotFound from './components/NotFound'
import Noume from './components/Noume'
import { QueriesContext } from './data/QueriesContext'

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/my-noumes' element={<MyNoumes />} />
      <Route path='/find-noumes' element={<FindNoumes />} />
      <Route path='/noumes/:id' element={<Noume />} />
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
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(150);
  const [selectedNoume, setSelectedNoume] = useState(null)
  const [savedNoumes, setSavedNoumes] = useState([]);

  return (
    <HashRouter>
      <QueriesContext.Provider value={{ rooms, setRooms, selectedLocation, setSelectedLocation, checkIn, setCheckIn, checkOut, setCheckOut, noumes, setNoumes, term, setTerm, loading, setLoading, minPrice, setMinPrice, maxPrice, setMaxPrice, selectedNoume, setSelectedNoume, savedNoumes, setSavedNoumes }}>
        <App />
      </QueriesContext.Provider>
      <Footer />
    </HashRouter >
  )
}
