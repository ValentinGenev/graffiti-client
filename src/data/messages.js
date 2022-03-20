import globals from '../config.json'

const { POSTS_PER_PAGE } = globals
const REST_API =
    `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api`

export async function getContent(page = 1, postsPerPage = POSTS_PER_PAGE) {
    try {
        const response =
            await fetch(`${REST_API}/messages/all/
                ${ page ? page + '/' : '' }?postsPerPage=${ postsPerPage }`)

        // TODO: delete me after the loader is done
        await new Promise(res => {
            setTimeout(() => {
                res()
            }, 1000)
        })
        // throw new Error('error')

        return await response.json()
    }
    catch (error) {
        return { error: error.message, success: false }
    }
}
