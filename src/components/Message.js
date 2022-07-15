import { Link } from 'react-router-dom'

export default function Message(props) {
    const { postId, date, message, tags } = props
    // TODO: show how much time has passed
    const postDate = new Date(date)
    const tagAnchors = tags?.map((tag, index) => {
        return <Link key={ index } to={ `/tag?tagName=${ tag }` } className="card-link">{ tag }</Link>
    })

    return (
        <li className="card mb-3" data-post={ postId }>
            <div className="card-body">
                <div className="card-subtitle mb-2 text-muted">{ postDate.toLocaleString('en-GB') }</div>
                <p className="card-text">{ message }</p>
                <div className="tags-wrapper">{ tagAnchors }</div>
            </div>
        </li>
    )
}
