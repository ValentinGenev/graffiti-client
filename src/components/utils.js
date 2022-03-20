export function Spinner(props) {
    return (
        <div className="d-flex align-items-center mb-2">
            <strong>{ props.children }</strong>
            <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div>
    )
}

export function Alert(props) {
    const { children, type } = props
    const className = `alert alert-${type}`

    return (
        <div className={ className } role="alert">
            { children }
        </div>
    )
}
