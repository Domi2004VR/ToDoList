import PopupWindow from "./PopupWindow";
import SideBar from "./SideBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {useEffect, useState} from "react";
import ToDo from './ToDo'
import '../styles/ToDoList.css'
import {createTasks, getTodo, openList} from '../services/api'
import { useParams } from 'react-router-dom';

function ToDoList({ user ,listToOpen, setListToOpen, openPopup, closePopup}) {
    const [toDoes, setToDoes] = useState([]);
    const [toDo, setToDo] = useState("")

    const [isDisabled, setIsDisabled] = useState(true);
    const [inputText, setInputText] = useState("");

    const { listId } = useParams();

    console.log("questa è la l'id della lista da aprire: " + listToOpen._id);


    useEffect(() => {
        getTodo(listId)
        .then((toDoListInfo) =>{
            setListToOpen(toDoListInfo)
        })
    }, [toDoes])

    function handleCreateTasks (listToOpenId) {
        console.log("sto stampando listToOpenId: " + listToOpenId);
        if (inputText === ""){
            return null
        }
        createTasks(inputText, listToOpenId)
            .then(updatedList => {
                console.log("sono todolist e ho ricevuto le tasks: " + JSON.stringify(updatedList));
                setToDoes([updatedList]);
                setInputText("")
            })
    }


    function handleRemove(id) {
        setToDoes(prev => prev.filter(todo => todo.id !== id));
    }

    function handleSubmit() {}


    return (
        <div className="toDoListContainerPage">
            <div className="sideBarContainerToDoPage">
                <SideBar nome={user.nome} openPopup={openPopup} closePopup={closePopup}  />
            </div>
            <div className="restantePaginaToDoPage">
                <h1 className="titleToDoList">{listToOpen.title}</h1>
                <p className="inviteCode">Il tuo codice d'invito: <b> {listToOpen.inviteCode} </b> </p>
                <div className="toDoListContainer">
                <div className="inputToDoContainer">
                    <Form.Control className="inputToDoCreate" size="lg" type="text" placeholder="Inserisci il testo per creare il To Do" name="inputTextToDo" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
                    <Button onClick={()=>{handleCreateTasks(listToOpen._id)}} className="buttonCreateToDo" variant="outline-primary">Crea una To-Do</Button>
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