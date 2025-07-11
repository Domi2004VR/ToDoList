import Form from "react-bootstrap/Form";
import "bootstrap-icons/font/bootstrap-icons.css"
import {useState} from "react";


function ToDo ({isDisabled, setIsDisabled, toDoes, setToDoes, done, setDone}) {

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

    function handleComplete (e) {
        setToDoes(toDoes.map((element)=>{
            if(e.target.id === element.id){
                return {...element, done: true}
            }
            return element;
        }));
    }

    //funzione prova id
    function handleId () {
        return crypto.randomUUID();
    }

    const id = handleId()

    return (
        <div className="ToDoContainer">
            <div className="checkBoxToDoContainer">
                <Form.Check id="checkBoxToDo" checked={toDoes.done} onChange={handleComplete} aria-label="option 1" />
            </div>
            <Form.Control key={id} className='textToDo' type="text" name="inputTextToDo" disabled={isDisabled} value={input} onChange={handleInputChange}/>
            {isDisabled? (
                <div className="toDoButtonsContainer">
                    <button className="icon-button" onClick={handleDisabledChange} id="editToDoButton">
                        <i className="iconsToDo bi bi-pencil"></i>
                    </button>
                    <button className="icon-button" id="removeToDoButton">
                        <i className="iconsToDo bi bi-trash"></i>
                    </button>
                </div>
                ) : (
                    <div className="toDoButtonsContainer">
                        <button className="icon-button" id="confirmEditToDoButton">
                            <i className="iconsToDo bi bi-check-circle"></i>
                        </button>
                        <button className="icon-button" id="cancelEditToDoButton">
                            <i className="icon-button bi bi-x-circle"></i>
                        </button>
                    </div>
            )}

        </div>
    )
}

export default ToDo