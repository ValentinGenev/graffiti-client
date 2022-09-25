import { useState, useEffect, useCallback } from 'react'
import { useSearchParams} from 'react-router-dom'
import Messages from './Messages'
import Pagination from './Pagination'
import { getMessages, checkParams } from '../data/messages'

export default function Wall() {
    const [searchParams] = useSearchParams()
    const [content, setContent] = useState({
        success: false,
        pagination: { pageIndex: 1 }
    })

    const loadPage = useCallback(async () => {
        const messages = await getMessages(checkParams(searchParams))
        if (messages.success) {
            setContent(messages)
        }
    }, [searchParams])

    useEffect(loadPage, [loadPage]);

    return (
        <div className="Wall container ms-0 me-4 p-0">
            <Messages
                key={ content.pagination.pageIndex }
                error={ content.error }
                success={ content.success }
                messages={ content.messages } />
            <Pagination data={ content.pagination } />
        </div>
    )
}
