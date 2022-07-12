import MessageForm from '../components/MessageForm'
import Wall from '../components/Wall'
import '../css/Index.css'

export default function Index() {
    return (
        <div className="container d-flex">
            <Wall />
            <MessageForm />
        </div>
    )
}
