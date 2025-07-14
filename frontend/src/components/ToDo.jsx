import Form from "react-bootstrap/Form";
import "bootstrap-icons/font/bootstrap-icons.css"
import {useEffect, useState} from "react";
import {deleteTask, updateTask} from "../services/api";


function ToDo ({onRemove, description, isDisabled, setIsDisabled, toDoes, setToDoes, todo, id, done, setDone}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);
    const [originalDescription, setOriginalDescription] = useState(description);



    function handleInputChange(event) {
        setEditedDescription(event.target.value);
    }


    function handleCancelEdit() {
        setEditedDescription(originalDescription); // reimposta la descrizione che aveva prima della modifica
        setIsEditing(false);
    }


    function handleEditClick() {
        setOriginalDescription(editedDescription); // salva lo descrizione attuale prima della modifica
        setIsEditing(true);
    }

    function handleConfirmEdit() {
        // aggiorna la descrizione nel frontend
        const updatedToDos = toDoes.map((t) => {
            if (t._id === todo._id) {
                return { ...t, description: editedDescription };
            }
            return t;
        });

        setToDoes(updatedToDos);
        updateTask(todo._id, editedDescription) //questo aggiorna il backend
        setIsEditing(false);

    }


    function handleDone (e) {
        setToDoes(toDoes.map((element)=>{
            if(e.target.id === element.id){
                return {...element, done: true}
            }
            return element;
        }));
    }

    function handleRemove () {
        deleteTask(todo._id)
        setToDoes(toDoes.filter((element) => element._id !== todo._id));
    }


    return (
        <div className="ToDoContainer">
            <div className="checkBoxToDoContainer">
                <Form.Check  id="checkBoxToDo" checked={toDoes.done} onChange={handleDone} aria-label="option 1" />
            </div>
            <Form.Control  className='textToDo' type="text" name="inputTextToDo" disabled={!isEditing} value={editedDescription} onChange={handleInputChange}/>
            {isEditing ? (
                <div className="toDoButtonsContainer">
                    <button className="icon-button confirmEditToDoButton" onClick={handleConfirmEdit}>
                        <i className="iconsToDo bi bi-check-circle"></i>
                    </button>
                    <button className="icon-button cancelEditToDoButton" onClick={handleCancelEdit}>
                        <i id="removeToDo" className="icon-button bi bi-x-circle"></i>
                    </button>
                </div>
                ) : (
                    <div className="toDoButtonsContainer">
                        <button className="icon-button editToDoButton" onClick={handleEditClick}>
                            <i className="iconsToDo bi bi-pencil"></i>
                        </button>
                        <button className="icon-button removeToDoButton" onClick={handleRemove}>
                            <i className="iconsToDo bi bi-trash"></i>
                        </button>
                    </div>
            )}

        </div>
    )
}

export default ToDo