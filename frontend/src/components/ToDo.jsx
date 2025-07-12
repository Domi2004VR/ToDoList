import Form from "react-bootstrap/Form";
import "bootstrap-icons/font/bootstrap-icons.css"
import {useState} from "react";


function ToDo ({onRemove, description, key, isDisabled, setIsDisabled, toDoes, setToDoes, todo, id, done, setDone}) {

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

    function handleDone (e) {
        setToDoes(toDoes.map((element)=>{
            if(e.target.id === element.id){
                return {...element, done: true}
            }
            return element;
        }));
    }

    function handleRemove (e) {
        setToDoes(toDoes.filter((element) => element.id !== e.currentTarget.id));
    }


    return (
        <div className="ToDoContainer">
            <div className="checkBoxToDoContainer">
                <Form.Check key={key} id="checkBoxToDo" checked={toDoes.done} onChange={handleDone} aria-label="option 1" />
            </div>
            <Form.Control key={key} className='textToDo' type="text" name="inputTextToDo" disabled={isDisabled} value={description} onChange={handleInputChange}/>
            {isDisabled? (
                <div className="toDoButtonsContainer">
                    <button id={id} className="icon-button editToDoButton" onClick={handleDisabledChange}>
                        <i id={id} className="iconsToDo bi bi-pencil"></i>
                    </button>
                    <button id={id} className="icon-button removeToDoButton" onClick={handleRemove}>
                        <i id={id} className="iconsToDo bi bi-trash"></i>
                    </button>
                </div>
                ) : (
                    <div className="toDoButtonsContainer">
                        <button id={id} className="icon-button confirmEditToDoButton" >
                            <i id={id} className="iconsToDo bi bi-check-circle"></i>
                        </button>
                        <button id={id} className="icon-button cancelEditToDoButton">
                            <i id={id} className="icon-button bi bi-x-circle"></i>
                        </button>
                    </div>
            )}

        </div>
    )
}

export default ToDo