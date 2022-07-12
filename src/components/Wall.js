import { useState, useEffect } from 'react'
import { useSearchParams} from 'react-router-dom'
import Pages from './Pages'
import Messages from './Messages'
import Pagination from './Pagination'
import { getContent } from '../data/messages'

export default function Wall() {
    // TODO: introduce filters and remove the tags from here
    const [searchParams] = useSearchParams();
    const [pagesCount, setPagesCount] = useState()
    const [pageIndex, setPageIndex] = useState(1)
    const [pages, setPages] = useState([undefined, <Messages key={ 1 } success={ false } />])

    const loadPage = async (index) => {
        if (checkIfLoaded(pages, index) && !checkIfHasTag(searchParams)) {
            setPageIndex(index)
        }
        else {
            setPages(pages => addPage(index, { success: false }, pages))
            setPageIndex(index)

            const args = {
                page: index,
                tag: searchParams?.get('tagName')
            }
            const content = await getContent(args)
            if (content.success) {
                setPages(pages => addPage(index, content, pages))
                setPagesCount(content.pagination.pagesCount)
            }
            else {
                // TODO: add refresh button loadPage(index)
            }
        }
    }

    useEffect(() => {
        // TODO: this got messy, figure it out
        loadPage(pageIndex)
    }, [searchParams]);

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
