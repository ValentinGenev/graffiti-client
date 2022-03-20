import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import Graffiti from './components/Graffiti'
import reportWebVitals from './lib/reportWebVitals'

ReactDOM.render(
    <React.StrictMode>
        <Graffiti />
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals(console.log)
