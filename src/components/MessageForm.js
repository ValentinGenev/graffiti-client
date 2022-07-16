import { useState } from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import MessageField from './MessageField'
import Alert from './utils/Alert'
import { SimpleSpinner } from './utils/Loader';
import { postMessage } from '../data/messages'
import getMessage from '../utils/ui-messages'

export default function MessageForm() {
    const [resetFlag, setResetFlag] = useState(0)
    const [postStatus, setPostStatus] = useState()
    const [message, setMessage] = useState('')
    const [tags, setTags] = useState([])

    const submitMessage = async event => {
        event.preventDefault()
        event.stopPropagation()

        setPostStatus(<SimpleSpinner />)
        const response = await handleSubmit({ message, tags }, resetForm)
        setPostStatus(
            <Alert type={ response.success ? 'success' : 'danger' }>
                { getMessage(response.code) }
            </Alert>
        )
    }
    const resetForm = () => {
        setResetFlag(!resetFlag)
        setTags([])
    }

    const deleteTag = i => {
        setTags(tags.filter((_tag, index) => index !== i))
    }
    const addTag = tag => {
        setTags([...tags, tag])
    }
    const clearAllTags = () => {
        setTags([])
    }

    return (
        <form onSubmit={ submitMessage } className="Sketch container m-0 p-0" noValidate>
            <MessageField
                key={ resetFlag }
                setValue={ setMessage } />

            <ReactTags
                name="tags"
                placeholder="Tag it e.g. tag, another tag"
                tags={ tags }
                delimiters={ [188, 9, 13] } // the key code for comma, tab and enter
                handleDelete={ deleteTag }
                handleAddition={ addTag }
                onClearAll={ clearAllTags }
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
                autofocus={ false }
                clearAll={ true } />

            { postStatus }

            <button type="submit" className="btn btn-primary mt-2">Send it</button>
        </form>
    )
}

async function handleSubmit(content, resetForm) {
    const { message, tags: tagsData } = content
    const tags = tagsData.map(tag => tag.text)

    const response = await postMessage({
        message,
        tags
    })
    if (!response.success) {
        return { success: false, code: response.error.code }
    }

    resetForm()

    return { success: true, code: 'MESSAGE_POSTED' }
}
