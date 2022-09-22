import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Index from './routes/Index'
import Messages from './routes/Tag'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={ <Home /> }>
                <Route index element={ <Index /> } />
                <Route path="messages" element={ <Messages /> } />
            </Route>
        </Routes>
    )
}
