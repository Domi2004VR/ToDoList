function ErrorMessage({message}){
    if (!message) return null;

    return (
        <div>
            <p id="error-message">{message}</p>
        </div>
    )
}

export default ErrorMessage;