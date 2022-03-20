import '../css/Pages.css'

export default function Pages(props) {
    const { pageIndex, pages } = props

    return pages.map((page, index) => {
        return page ? (
            <div
                key={ index }
                data-page-index={ pageIndex }
                className={ index === pageIndex ? 'page active' : 'page' }
                >{ page }</div>
        ) : ''
    })
}
