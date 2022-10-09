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
    if (!searchParams.has('pageIndex')) {
        searchParams.append('pageIndex', 1)
    }
    if (!searchParams.has('postsPerPage')) {
        searchParams.append('postsPerPage', POSTS_PER_PAGE)
    }

    return searchParams
}
