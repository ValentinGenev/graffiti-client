import { useState } from 'react'
import Field from './Field'
import Alert from './utils/Alert'
import { postMessage } from '../data/messages'
import getMessage from '../utils/ui-messages'

export default function MessageForm() {
    const [postStatus, setPostStatus] = useState()

    const handlePosting = async (event) => {
        setPostStatus('Waiting')

        const response = await handleSubmit(event)
        setPostStatus(
            <Alert type={ response.success ? 'success' : 'danger' }>
                { getMessage(response.code) }
            </Alert>
        )
    }

    return (
        <form onSubmit={ handlePosting } className="Sketch container m-0 p-0" noValidate>
            <Field
                type="text"
                name="poster"
                label="HELLO, my name is" />

            <Field
                type="textarea"
                name="message"
                label="Message"
                validation={ ['isEmpty', 'isLengthy'] }
                required />

            { postStatus }

            <button type="submit" className="btn btn-primary">Send it</button>
        </form>
    )
}

async function handleSubmit(event) {
    event.preventDefault()
    event.stopPropagation()

    // TODO: bubble the validation results and submit only if valid

    const response = await postMessage({
        poster: event.target.poster.value,
        message: event.target.message.value
    })

    // TODO: reset form

    return response.success ?
        { success: true, code: 'MESSAGE_POSTED' } :
        { success: false, code: response.error.code }
}
