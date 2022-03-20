export default function Message(props) {
    const { postId, date, poster, message } = props
    // TODO: show how much time has passed
    const postDate = new Date(date)

    return (
        <li className="card mb-3" data-post={ postId }>
            <div className="card-header">
                <h2 className="card-title fs-6 mb-0">{ poster ? poster : 'John Doe' }</h2></div>
            <div className="card-body">

                <div className="card-subtitle mb-2 text-muted">{ postDate.toLocaleString('en-GB') }</div>
                <p className="card-text">{ message }</p>
            </div>
        </li>
    )
}
