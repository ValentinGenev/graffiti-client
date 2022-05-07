import {  useState, useEffect  } from 'react'
import globals from '../config.json'

const {  MAX_MESSAGE_LENGTH  } = globals

export default function MessageField(props) {
    const { label, help, setValue  } = props
    const [className, setClassName] = useState('form-control')
    const [feedback, setFeedback] = useState([])

    const handleInput = async event => {
        setClassName('form-control validated')
        setFeedback(validate(event.target.value))

        setValue(event.target.value)
    }

    useEffect(() => {
        if (className.indexOf('validated') >= 0) {
            feedback.length ?
                setClassName('form-control is-invalid') :
                setClassName('form-control is-valid')
         }
    }, [feedback, className])


    const field = <textarea
        id="message"
        className={ className }
        aria-describedby="fieldHelp"
        placeholder="Write here"
        rows="9"
        onKeyUp={ handleInput } ></textarea>

    return (
        <div className="form-group mb-2">
            { label && <label htmlFor={ 'message' }>{ label }</label> }
            { field }
            { help && <small id="fieldHelp" className="form-text text-muted">{ help }</small> }
            <ul className="invalid-feedback">{ feedback }</ul>
        </div>
    )
 }

function validate(value) {
    const feedback = []

    if (!Boolean(value)) {
        feedback.push(<li key={ 'isEmpty' }>What's on your mind?</li>)
    }

    if (value.length > MAX_MESSAGE_LENGTH) {
        feedback.push(
            <li key={ 'isLengthy' }>
                The message should be shorter than { MAX_MESSAGE_LENGTH } characters.
            </li>
        )
    }

    return feedback
 }
