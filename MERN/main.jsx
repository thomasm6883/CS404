import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App.jsx'

const DetailsContext = React.createContext(null)
export default DetailsContext

const root = createRoot(document.getElementById('root'))

root.render(

  <App />
)
