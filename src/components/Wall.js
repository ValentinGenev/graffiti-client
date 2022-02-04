import Messages from './Messages'
import '../css/Wall.css'

export default function Wall() {
    return (
        <div className="Wall">
            <header className="Wall-header">
                <h1>graffiti</h1>
            </header>
            <Messages />
        </div>
    )
}
