import PopupWindow from "./PopupWindow";
import SideBar from "./SideBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {useState} from "react";
import ToDo from './ToDo'
import '../styles/ToDoList.css'

function ToDoList({openPopup, closePopup}) {
    const [toDoes, setToDoes] = useState([]);
    const [toDo, setToDo] = useState("")


    const [isDisabled, setIsDisabled] = useState(true);
    const [inputText, setInputText] = useState("");

    function handleInputSubmit(){
        if (inputText === ""){
            return null;
        }
        setToDoes([...toDoes, { id: crypto.randomUUID(), description: inputText, done: false }]);
        setInputText("")
    }

    function handleRemove(id) {
        setToDoes(prev => prev.filter(todo => todo.id !== id));
    }

    return (
        <div className="toDoListContainerPage">
            <div className="sideBarContainerToDoPage">
                <SideBar nome="Lello" openPopup={openPopup} closePopup={closePopup}  />
            </div>
            <div className="restantePaginaToDoPage">
                <h1 className="titleToDoList">Lello</h1>
                <div className="toDoListContainer">
                <div className="inputToDoContainer">
                    <Form.Control className="inputToDoCreate" size="lg" type="text" placeholder="Inserisci il testo per creare il To Do" name="inputTextToDo" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
                    <Button onClick={handleInputSubmit} className="buttonCreateToDo" variant="outline-primary">Crea una To-Do</Button>
                </div>
                <div className="ToDoesContainer">
                    {toDoes.map((todo, index) =>{
                        return <ToDo todo={todo} onRemove={handleRemove} description={todo.description} id={todo.id} key={todo.id} isDisabled={isDisabled} setIsDisabled={setIsDisabled} toDoes={toDoes} setToDoes={setToDoes}/>
                    })}

                </div>
                </div>
            </div>
        </div>
    )
}

export default ToDoList;