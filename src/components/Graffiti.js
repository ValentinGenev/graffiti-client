import MessageForm from './MessageForm'
import Wall from './Wall'
import '../css/Graffiti.css'

export default function Graffiti() {
    return (
        <main className="Graffiti">
            <header className="container mb-4">
                <h1>graffiti</h1>
            </header>

            <div className="container d-flex">
                <Wall />
                <MessageForm />
            </div>

            <footer className="container mt-4">paint it dirty</footer>
        </main>
    )
}
