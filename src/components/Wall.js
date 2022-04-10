import { useState, useEffect } from 'react'
import Pages from './Pages'
import Messages from './Messages'
import Pagination from './Pagination'
import { getContent } from '../data/messages'

export default function Wall() {
    const [pagesCount, setPagesCount] = useState()
    const [pageIndex, setPageIndex] = useState(1)
    const [pages, setPages] = useState([undefined, <Messages key={ 1 } success={ false } />])

    const loadPage = async (index) => {
        const pageWasLoaded = Boolean(pages[index] && pages[index].props.success)

        if (pageWasLoaded) {
            setPageIndex(index)
        }
        else {
            setPages(pages => addPage(index, { success: false }, pages, loadPage))
            setPageIndex(index)

            const content = await getContent(index)
            setPages(pages => addPage(index, content, pages))
            if (content.success) {
                setPagesCount(content.pagination.pagesCount)
            }
            else {
                // TODO: add refresh button loadPage(index)
            }
        }
    }

    useEffect(() => loadPage(pageIndex), []);

    return (
        <div className="Wall container me-4 p-0">
            <Pages
                pages={ pages }
                pageIndex={ pageIndex } />

            <Pagination
                loadPage={ loadPage }
                pageIndex={ pageIndex }
                pagesCount={ pagesCount } />
        </div>
    )
}

function addPage(index, content, pages) {
    const { error, success, messages } = content
    const newPages = [...pages]

    newPages[index] =
        <Messages
            key={ index }
            error={ error }
            success={ success }
            messages={ messages } />

    return newPages
}
