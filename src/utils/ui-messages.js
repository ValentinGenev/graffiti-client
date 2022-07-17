import globals from '../config.json'

const { MAX_MESSAGE_LENGTH } = globals
const UI_MESSAGES = {
    'MESSAGE_POSTED': 'The message was successfully posted.',
    'SOMETHING_WENT_WRONG': 'Something went wrong.',
    'TOO_MANY_REQUESTS': 'You need to wait 2 minutes before your next post.',
    'MAX_LENGTH': `The message should be shorter than ${MAX_MESSAGE_LENGTH} characters.`,
    'MISSING_DATA': 'What\'s on your mind?',
}

export default function getMessage(code) {
    return UI_MESSAGES[code]
}
