import { Link } from 'react-router-dom'
import { buildRelativeUrl } from '../lib/crud'

export default function Pagination(props) {
    const { pageIndex, pagesCount } = props.data
    if (!pageIndex || !pagesCount) {
        return ''
    }

    const navItems = []
    for (let i = 0; i <= pagesCount + 1; i++) {
        const { index, text, className, style } = setButtonData(i, pageIndex, pagesCount)
        const linkUrl = buildRelativeUrl('messages', [`pageIndex=${index}`])

        navItems.push(
            <li key={ i } className={ className } style={ style }>
                <Link
                    key={ index }
                    to={{ pathname: linkUrl }}
                    className="page-link" role="button">{ text }</Link>
            </li>
        )
    }

    return (
        <nav className='Pagination d-flex justify-content-start' aria-label="pages navigation">
            <ul className='pagination'>{ navItems }</ul>
        </nav>
    )
}

function setButtonData(buttonIndex, pageIndex, pagesCount) {
    switch (buttonIndex) {
        case 0:
            return {
                index: pageIndex - 1,
                text: 'Previous',
                className: 'page-item ' + (pageIndex === 1 ? 'disabled' : ''),
                style: { pointerEvents: pageIndex === 1 ? 'none' : 'initial' }
            }

        case pagesCount + 1:
            return {
                index: pageIndex + 1,
                text: 'Next',
                className: 'page-item ' + (pageIndex === pagesCount ? 'disabled' : ''),
                style: { pointerEvents: pageIndex === pagesCount ? 'none' : 'initial' }
            }

        default:
            return {
                index: buttonIndex,
                text: buttonIndex,
                className: 'page-item ' + (buttonIndex === pageIndex ? 'active' : '')
            }

    }
}
