import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import Wall from './components/Wall'
import reportWebVitals from './lib/reportWebVitals'

ReactDOM.render(
    <React.StrictMode>
        <Wall />
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals(console.log)
