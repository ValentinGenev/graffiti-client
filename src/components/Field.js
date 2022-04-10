import { useState, useEffect } from 'react'
import globals from '../config.json'

const { MAX_MESSAGE_LENGTH } = globals

export default function Field(props) {
    const { type, name, label, placeholder, help, validation } = props
    const [className, setClassName] = useState('form-control')
    const [feedback, setFeedback] = useState([])

    const validateField = async event => {
        setClassName('form-control validated')
        setFeedback(createFeedback(event.target.value, validation))
    }

    useEffect(() => {
        if (validation && className.indexOf('validated') >= 0) {
            feedback.length ?
                setClassName('form-control is-invalid') :
                setClassName('form-control is-valid')
        }
     }, [feedback, className, validation])

    const inputField = type !== 'textarea' ?
        <input
            type={ type }
            id={ name }
            className= { className }
            aria-describedby="fieldHelp"
            placeholder={ placeholder }
            onKeyUp={ validateField } /> :
        <textarea
            id={ name }
            className= { className }
            aria-describedby="fieldHelp"
            placeholder={ placeholder }
            rows="9"
            onKeyUp={ validateField } ></textarea>

    return (
        <div className="form-group mb-2">
            { label && <label htmlFor={ name }>{ label }</label> }
            { inputField }
            { help && <small id="fieldHelp" className="form-text text-muted">{ help }</small> }
            <ul className="invalid-feedback">{ feedback }</ul>
        </div>
    )
}

function createFeedback(value, validation) {
    const feedback = []

    if (validation.length) {
        for (const criteria in validation) {
            switch (validation[criteria]) {
                case 'isEmpty':
                    !Boolean(value) &&
                        feedback.push(<li key={ criteria }>What's on your mind?</li>)
                    break;
                case 'isLengthy':
                    value.length > MAX_MESSAGE_LENGTH &&
                        feedback.push(
                            <li key={ criteria }>
                                The message should be shorter than { MAX_MESSAGE_LENGTH } characters.
                            </li>
                        )
                    break;

                default:
                    break;
            }
        }
    }

    return feedback
}
