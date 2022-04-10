import globals from '../config.json'

const { POSTS_PER_PAGE } = globals
const API_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/messages`

export async function getContent(page = 1, postsPerPage = POSTS_PER_PAGE) {
    try {
        const response =
            await fetch(`${API_URL}/all/
                ${ page ? page + '/' : '' }?postsPerPage=${ postsPerPage }`)

        return await response.json()
    }
    catch (error) {
        return { error: error.message, success: false }
    }
}

export async function postMessage(message) {
    const data = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    }

    try {
        const request = await fetch(`${API_URL}/new`, data)
        const response = await request.json()

        return response
    }
    catch (error) {
        return { error: error.message, success: false }
    }
}
