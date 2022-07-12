import globals from '../config.json'
import { API_URL } from '../utils/constants'

const { POSTS_PER_PAGE } = globals

export async function getContent(args = { page: 1, postsPerPage: POSTS_PER_PAGE, tag: '' }) {
    console.log(args)

    try {
        const { page, postsPerPage, tag } = args
        const response =
            await fetch(`${ API_URL }/all${
                ( page ? '/' + page + '/' : '' ) +
                ( '?postsPerPage=' + ( postsPerPage ? postsPerPage : POSTS_PER_PAGE ) ) +
                ( tag ? '&tag=' + tag : '')
            }`)

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
