import { useEffect, useRef, useState } from "react"
import getMessage from '../utils/ui-messages'

export default function MessageField(props) {
    const { setMessage, feedback } = props
    const [className, setClassName] = useState('form-control')
    const isInitial = useRef(true)

    useEffect(() => {
        if (!isInitial.current) {
            const validationClass = feedback.length ? 'is-invalid' : 'is-valid'
            setClassName(['form-control', validationClass].join(' '))
        }
    }, [feedback])

    const handleInput = event => {
        isInitial.current = false
        setMessage(event.target.value)
    }

    const feedbackMessages = feedback.map((message, index) => (
        <li key={index}>{getMessage(message)}</li>
    ))

    return (
        <div className="form-group mb-2">
            <textarea
                id="message"
                className={className}
                aria-describedby="fieldHelp"
                placeholder="Write here"
                rows="9"
                onBlur={handleInput} ></textarea>
            <ul className="invalid-feedback">{feedbackMessages}</ul>
        </div>
    )
}
