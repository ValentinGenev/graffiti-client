import { Link } from 'react-router-dom'
import { buildRelativeUrl } from '../lib/crud'

export default function Pagination(props) {
    const { pageIndex, pagesCount, _links } = props.data

    // FIXME: fix the pagination when another filter is applied (tag, poster)

    if (!pageIndex || !pagesCount) {
        return ''
    }

    const prevPage = _links.prev ? createAdjacent(_links.prev, pageIndex - 1) : ''
    const nextPage = _links.next ? createAdjacent(_links.next, pageIndex + 1) : ''
    const navItems = []
    for (let i = 1; i <= pagesCount; i++) {
        const linkUrl = buildRelativeUrl('messages', [`pageIndex=${i}`])

        navItems.push(
            <li key={ i } className={ i === pageIndex ? 'active' : '' }>
                <Link
                    to={{ pathname: linkUrl }}
                    className="page-link" role="button">{ i }</Link>
            </li>
        )
    }

    return (
        <nav className='Pagination d-flex justify-content-start' aria-label="pages navigation">
            <ul className='pagination'>
                { prevPage }
                { navItems }
                { nextPage }
            </ul>
        </nav>
    )
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
