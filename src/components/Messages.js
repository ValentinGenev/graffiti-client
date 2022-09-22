import Alert from './utils/Alert'
import { Spinner } from './utils/Loader'
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
                    message={ entry.message }
                    tags={entry?._embedded?.tags} />
            )
        })
    }

    return (
        <ul className='Messages p-0'>
            { pageContent }
        </ul>
    )
}
