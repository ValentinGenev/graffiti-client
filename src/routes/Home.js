import { Link, Outlet } from 'react-router-dom'

export default function Home() {
    return (
        <main>
            <header className="container mb-4">
                <h1><Link to="/">graffiti</Link></h1>
            </header>

            <Outlet />

            <footer className="container mt-4">paint it dirty</footer>
        </main>
    )
}
