import { Alert, Spinner } from './utils'
import Message from './Message'

export default function Messages(props) {
    const { error, success, messages } = props
    // TODO: do placeholders instead a spinner
    let pageContent = <Spinner>Loading...</Spinner>

    if (error) {
        pageContent = <Alert type="danger">Something went wrong!</Alert>
    }

    if (success) {
        pageContent = messages.map(entry => {
            return (
                <Message
                    key={ entry.id }
                    postId={ entry.id }
                    date={ entry.post_date }
                    poster={ entry.poster }
                    message={ entry.message } />
            )
        })
    }

    return (
        <ul className='Messages p-0'>
            { pageContent }
        </ul>
    )
}
