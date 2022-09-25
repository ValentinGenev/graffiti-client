import { API_URL } from '../utils/constants'

export async function get(url) {
    try {
        const response = await fetch(url)
        return await response.json()
    }
    catch (error) {
        buildError(error)
    }
}

export async function post(url, data) {
    const dataWrapper = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(url, dataWrapper)
        return await response.json()
    }
    catch (error) {
        buildError(error)
    }
}

export function parseFilterObject(filter = {}) {
    const params = []

    for (const key in filter) {
        if (Object.hasOwnProperty.call(filter, key) && filter[key]) {
            params.push(`${key}=${filter[key]}`)
        }
    }

    return params
}

export function buildUrl(resource, params = []) {
    const query = params.length ? `?${params.join('&')}` : ''
    return `${API_URL}/${resource}/${query}`
}

function buildError(error) {
    return { error: error.message, success: false }
}
