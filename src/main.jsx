import React from 'react'
import ReactDOM from 'react-dom/client'
import { WrappedApp as App } from './App'
import 'react-calendar/dist/Calendar.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
