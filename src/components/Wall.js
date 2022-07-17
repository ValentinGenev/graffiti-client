import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams} from 'react-router-dom'
import Pages from './Pages'
import Messages from './Messages'
import Pagination from './Pagination'
import { getContent } from '../data/messages'

export default function Wall() {
    // TODO: introduce filters and remove the tags from here
    const isInitial = useRef(true)
    const [searchParams] = useSearchParams();
    const [pagesCount, setPagesCount] = useState()
    const [pageIndex, setPageIndex] = useState(1)
    const [pages, setPages] = useState([undefined, <Messages key={ 1 } success={ false } />])

    const loadPage = useCallback(async (index) => {
        if (checkIfLoaded(pages, index) && !checkIfHasTag(searchParams)) {
            setPageIndex(index)
        }
        else {
            setPages(pages => addPage(index, { success: false }, pages))
            setPageIndex(index)

            const content = await getContent({
                page: index,
                tag: searchParams?.get('tagName')
            })
            if (content.success) {
                setPages(pages => addPage(index, content, pages))
                setPagesCount(content.pagination.pagesCount)
            }
        }
    }, [pages, searchParams])

    useEffect(() => {
        if (isInitial.current) {
            loadPage(pageIndex)
            isInitial.current = false
        }
    }, [isInitial, pageIndex, loadPage]);

    return (
        <div className="Wall container ms-0 me-4 p-0">
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

function checkIfLoaded(pages, index) {
    return Boolean(pages[index] && pages[index].props.success)
}
function checkIfHasTag(searchParams) {
    return searchParams?.get('tagName')
}
