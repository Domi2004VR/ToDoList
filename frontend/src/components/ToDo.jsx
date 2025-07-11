import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "bootstrap-icons/font/bootstrap-icons.css"
import {useState} from "react";


function ToDo ({isDisabled, setIsDisabled}) {

    const [input, setInput] = useState("");

    function handleInputChange (event) {
        setInput(event.target.value);
    }

    function handleDisabledChange() {
        if (isDisabled === false) {
            setIsDisabled(true)
        }
        setIsDisabled(false)
    }

    return (
        <div className="ToDoContainer">
            <FloatingLabel controlId="floatingName" label="Inserisci il testo per creare il To Do" name="inputTextToDo" className="mb-3" disabled={isDisabled}>
                <Form.Control  type="text" name="inputTextToDo"  value={input} onChange={handleInputChange}   />  {/*Aggiorno il valore del nome in tempo reale dentro lo stato RegisterForm tramite handleChange*/}
            </FloatingLabel>
            {isDisabled? (
                <div className="ToDoButtonsContainer">
                    <button onClick={handleDisabledChange} id="editToDoButton">
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button id="deleteToDoButton">
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
                ) : (
                    <div className="ToDoButtonsContainer">
                        <button id="confirmEditToDoButton">
                            <i className="bi bi-check-circle"></i>
                        </button>
                        <button id="cancelEditToDoButton">
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
            )}

        </div>
    )
}

export default ToDo