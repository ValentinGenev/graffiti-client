const UI_MESSAGES = {
    'MESSAGE_POSTED': 'The message was successfully posted.',
    'SOMETHING_WENT_WRONG': 'Something went wrong.',
    'FORM_VALIDATION_FAILED': 'The form validation failed.',
    'TOO_MANY_REQUESTS': 'You need to wait 2 minutes before your next post.',
    'MAX_LENGTH_EXCEEDED': 'Your message exceeds the maximum message length.',
    'MISSING_DATA': 'What\'s the message?'
}

export default function getMessage(code) {
    return UI_MESSAGES[code]
}
