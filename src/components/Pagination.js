export default function Pagination(props) {
    const { loadPage, pageIndex, pagesCount } = props
    if (!pageIndex || !pagesCount) {
        return ''
    }

    const navItems = []
    for (let i = 0; i <= pagesCount + 1; i++) {
        const { index, text, className } = setButtonData(i, pageIndex, pagesCount)

        navItems.push(
            <li
                key={ i }
                data-target-page={ index }
                className={ className }
                onClick={ () => loadPage(index) }><span className="page-link" role="button">{ text }</span></li>
        )
    }

    return (
        <nav className='Pagination d-flex justify-content-end' aria-label="pages navigation">
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
                className: 'page-item ' + (pageIndex === 1 ? 'disabled' : '')
            }

        case pagesCount + 1:
            return {
                index: pageIndex + 1,
                text: 'Next',
                className: 'page-item ' + (pageIndex === pagesCount ? 'disabled' : '')
            }

        default:
            return {
                index: buttonIndex,
                text: buttonIndex,
                className: 'page-item ' + (buttonIndex === pageIndex ? 'active' : '')
            }

    }
}
