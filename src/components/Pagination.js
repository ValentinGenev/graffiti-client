import { Link } from 'react-router-dom'
import { buildRelativeUrl } from '../lib/crud'

export default function Pagination(props) {
    const { pageIndex, pagesCount, _links } = props.data
    const params = Array.from(props.searchParams.entries())

    if (!pageIndex || !pagesCount) {
        return ''
    }

    return (
        <nav className='Pagination d-flex justify-content-start' aria-label="pages navigation">
            <ul className='pagination'>
                { _links.prev ? createAdjacent(_links.prev, pageIndex - 1) : '' }
                { createNavItems(props.data, params) }
                { _links.next ? createAdjacent(_links.next, pageIndex + 1) : '' }
            </ul>
        </nav>
    )
}

function createNavItems(data, params) {
    const { pageIndex, pagesCount } = data
    const navItems = []

    for (let i = 1; i <= pagesCount; i++) {
        const linkUrl = buildRelativeUrl('messages', setNavItemParams(params, i))

        navItems.push(
            <li key={ i } className={ i === pageIndex ? 'active' : '' }>
                <Link
                    to={{ pathname: linkUrl }}
                    className="page-link" role="button">{ i }</Link>
            </li>
        )
    }
    return navItems
}

function setNavItemParams(params, index) {
    const navParams = []

    for (const param of params) {
        let [key, value] = param
        if (key === 'pageIndex') value = index
        navParams.push(`${key}=${value}`)
    }
    return navParams
}

function createAdjacent(link, key) {
    return (
        <li key={ key }>
            <Link
                to={ link.href }
                className="page-link" role="button">{ link.name }</Link>
        </li>
    )
}
