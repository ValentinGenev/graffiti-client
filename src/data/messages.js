import globals from '../config.json'
import { buildUrl, get, parseFilterObject } from '../lib/crud'

const { POSTS_PER_PAGE } = globals

export async function getMessages(searchParams) {
    const filter = {
        pageIndex: searchParams?.get('pageIndex'),
        postsPerPage: searchParams?.get('postsPerPage'),
        tag: searchParams?.get('tag')
    }

    const params = parseFilterObject(filter)
    const url = buildUrl('messages', params)

    return await get(url)
}

export function checkParams(searchParams) {
    const params = new URLSearchParams(searchParams)

    if (!params.has('pageIndex')) {
        params.append('pageIndex', 1)
    }
    if (!params.has('postsPerPage')) {
        params.append('postsPerPage', POSTS_PER_PAGE)
    }

    return params
}
