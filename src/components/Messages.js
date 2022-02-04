import { useState, useEffect } from 'react'
import { getMessages } from '../data/messages'

export default function Messages() {
    const [content, setContent] = useState()
    
    useEffect(() => {
        // Initial content load
        if (!content) getContent()
    });
    
    async function getContent() {
        setContent(await getMessages(6))
    }

    const messages = content?.messages?.map(entry => 
        <li id={ entry.id }>{ entry.message }</li>
    )

    return (
        <ul>{ messages }</ul>
    )
}
