import { useState, useEffect, useCallback } from 'react'
import { useSearchParams} from 'react-router-dom'
import Messages from './Messages'
import Pagination from './Pagination'
import { getMessages, checkParams } from '../data/messages'

export default function Wall() {
    const [searchParams] = useSearchParams()
    const [content, setContent] = useState({ success: false })
    const [pagination, setPagination] = useState('')

    const loadPage = useCallback(async () => {
        const content = await getMessages(checkParams(searchParams))

        setContent(content)

        if (content.pagination) {
            setPagination(<Pagination data={ content.pagination } />)
        }
    }, [searchParams])

    useEffect(loadPage, [loadPage]);

    // TODO: check if the error messages are still working
    return (
        <div className="Wall container ms-0 me-4 p-0">
            <Messages
                error={ content.error }
                success={ content.success }
                messages={ content.messages } />
            { pagination }
        </div>
    )
}
