const REST_API = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api`

export async function getMessages(postsPerPage) {
    try {
        const response = await fetch(`${REST_API}/messages/all/${postsPerPage ? '?postsPerPage=' + postsPerPage : ''}`)
    
        return await response.json()
    }
    catch (error) {
        return { success: false }
    }
}
