import PopupWindow from "./PopupWindow";
import SideBar from "./SideBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {useState} from "react";
import ToDo from './ToDo'

function ToDoList({viewPopup}) {
    const [toDoes, setToDoes] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);



    return (
        <div className="ToDoListContainer">
            {viewPopup === true ? <PopupWindow popupInfo={popupMyToDoList}/> : null}
            <div className="SideBarContainer">
                <SideBar nome="Diego"/>
            </div>
            <div className="RestantePagina">
                <h1 className="titleToDoList">Lello</h1>
                <div className="toDoListContainer"></div>
                <div className="inputToDoContainer">
                    <FloatingLabel controlId="floatingName" label="Inserisci il testo per creare il To Do"
                                   name="inputTextToDo" className="mb-3">
                        <Form.Control type="text" name="inputTextToDo" value={RegisterForm.nome}
                                      onChange={handleChange}/> {/*Aggiorno il valore del nome in tempo reale dentro lo stato RegisterForm tramite handleChange*/}
                    </FloatingLabel>
                    <Button className="buttonCreateToDo" variant="outline-primary">Crea una To-Do</Button>
                </div>
                <div className="ToDoesContainer">
                    <ToDo isDisabled={isDisabled} setIsDisabled={setIsDisabled}/>
                </div>
            </div>
        </div>
    )
}

export default ToDoList;