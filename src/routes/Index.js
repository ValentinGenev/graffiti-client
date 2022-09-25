import Wall from '../components/Wall'
import MessageForm from '../components/MessageForm'

export default function Index() {
    return (
        <div className="container d-flex">
            <Wall />
            <MessageForm />
        </div>
    )
}
