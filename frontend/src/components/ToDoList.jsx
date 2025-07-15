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
    const [toDo, setToDo] = useState([])

    const [isDisabled, setIsDisabled] = useState(true);
    const [inputText, setInputText] = useState("");

    const { listId } = useParams();


    useEffect(() => {
        getTodo(listId)
        .then((toDoListInfo) =>{
            setListToOpen(toDoListInfo)
            setToDoes(toDoListInfo.tasks)
            console.log(toDoListInfo.tasks)
        })
    }, []); //questo useEffect serve per caricare la lista quando si entra nella pagina, non viene più ricaricato

    function handleCreateTasks (listToOpenId) {
        if (inputText === ""){
            return null
        }
        createTasks(inputText, listToOpenId)
            .then(updatedList => {
                //ricevo la lista di task (array) e la memorizzo come stato di toDoes che re-triggera il .map che è colui che renderizza i tasks (componente ToDo.jsx)
                //riga 64
                setToDoes(updatedList);
                //resetto a 0 il campo di input che mi serviva per impostare la descrizione della nuova task da fare
                setInputText("")
            })
    }

    function handleRemove(id) {
        setToDoes(prev => prev.filter(todo => todo.id !== id));
    }


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
                    {toDoes.map((todo) =>{
                        return <ToDo todo={todo} onRemove={handleRemove} description={todo.description} id={todo._id} isDisabled={isDisabled} setIsDisabled={setIsDisabled} toDoes={toDoes} setToDoes={setToDoes}/>
                    })}

                </div>
                </div>
            </div>
        </div>
    )
}

export default ToDoList;