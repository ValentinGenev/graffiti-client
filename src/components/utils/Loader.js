export default function Spinner(props) {
    return (
        <div className="d-flex align-items-center mb-2">
            <strong>{ props.children }</strong>
            <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div>
    )
}
