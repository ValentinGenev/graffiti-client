export default function Message(props) {
    const { postId, date, message } = props
    // TODO: show how much time has passed
    const postDate = new Date(date)

    return (
        <li className="card mb-3" data-post={ postId }>
            <div className="card-body">
                <div className="card-subtitle mb-2 text-muted">{ postDate.toLocaleString('en-GB') }</div>
                <p className="card-text">{ message }</p>
            </div>
        </li>
    )
}
