import { useState } from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import Field from './Field'
import Alert from './utils/Alert'
import { postMessage } from '../data/messages'
import getMessage from '../utils/ui-messages'

export default function MessageForm() {
    const [postStatus, setPostStatus] = useState()
    const [tags, setTags] = useState([])

    const handlePosting = async (event) => {
        setPostStatus('Waiting')

        const response = await handleSubmit(event)
        setPostStatus(
            <Alert type={ response.success ? 'success' : 'danger' }>
                { getMessage(response.code) }
            </Alert>
        )
    }

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    }
    const handleAddition = tag => {
        setTags([...tags, tag]);
    }
    const onClearAll = () => {
        setTags([]);
    }

    return (
        <form onSubmit={ handlePosting } className="Sketch container m-0 p-0" noValidate>
            <Field
                type="textarea"
                name="message"
                placeholder="What's on your mind?"
                validation={ ['isEmpty', 'isLengthy'] }
                required />

            <ReactTags
                name="tags"
                placeholder="Tag it e.g. tag, another tag"
                tags={ tags }
                delimiters={ [188] } // key codes for comma and enter
                handleDelete={ handleDelete }
                handleAddition={ handleAddition }
                onClearAll={ onClearAll }
                inputFieldPosition="top"
                classNames={{
                    tags: 'form-group mb-2',
                    tagInput: 'd-flex flex-row',
                    tagInputField: 'form-control w-auto flex-grow-1',
                    clearAll: 'btn btn-secondary ms-2',
                    selected: 'mt-2',
                    tag: 'badge bg-dark me-1',
                    remove: 'btn btn-dark btn-sm p-0 ms-1 lh-1'
                }}
                allowUnique={ false }
                allowDragDrop={ false }
                clearAll={ true } />

            { postStatus }

            <button type="submit" className="btn btn-primary mt-2">Send it</button>
        </form>
    )
}

async function handleSubmit(event) {
    event.preventDefault()
    event.stopPropagation()

    // TODO: bubble the validation results and submit only if valid

    const response = await postMessage({
        poster: 'anonymous',
        message: event.target.message.value
    })

    // TODO: reset form

    return response.success ?
        { success: true, code: 'MESSAGE_POSTED' } :
        { success: false, code: response.error.code }
}
