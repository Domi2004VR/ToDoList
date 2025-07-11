import SideBar from "./SideBar";
import ToDoListCard from "./ToDoListCard";
import Button from 'react-bootstrap/Button';
import "../styles/myToDoLists.css";
import {useState} from "react";
import {createTodo, joinTodo} from "../services/api";

function MyToDoLists({openPopup,closePopup}) {

    const [error,setError] = useState(null);


    function handleCreateTodo(title){
        createTodo(title)
            .then(res => {
                const newTodo = res.body; //Se ricevo la nuova To-do creata dalla API che fa la fetch la salvo in newTodo per poi usarla
                //aggiungo la parte che ti collega alla pagina todolist
            })
            .catch(err => {   //Se ricevo un errore dalla API che fa la fetch per creare una To-Do salvo nello stato
                setError(err.message);
            })
    }
    function handleJoinTodo(code){
        joinTodo(code)
            .then(res=>{
                const joinTodo = res.body.todoList; //Se ricevo la To-Do da joinare dalla API che fa la fetch la salvo in joinTodo per poi usarla
                //Aggiungo parte che porta ti collega alla pagina todolist
            })
            .catch(err=>{
                setError(err.message);
            })
    }

    const popupJoin = {   //proprietà da passare al popup window per la finestra di unione a una To-Do
        title: "Unisciti a To Do",
        message: "Inserisci il codice d'invito",
        inputText:{
            enable: true,
            placeholder: "Inserisci il codice d'invito",
            value: ""
        },
        errorMessage: error,
        handleConfirm:handleJoinTodo,
        handleClose: closePopup,
    }
    const popupCreate = {           //proprietà da passare al popup window per la finestra di creazione di una To-Do
        title: "Crea una To-Do",
        message: "Inserisci il nome della To-Do",
        inputText:{
            enable: true,
            placeholder: "Inserisci il nome della To-Do",
            value: ""
        },
        errorMessage: error,
        handleConfirm: handleCreateTodo,
        handleClose: closePopup,
    }
    return (
       <div className="myToDoListsContainer">
           <div className="SideBarContainer">
               <SideBar nome="Diego" openPopup={openPopup} closePopup={closePopup}  />
           </div>
           <div className="RestantePagina">
               <h1 className="titleMyToDoListsPage">Le mie To-Do List</h1>
               <div className="myToDoButtonsDiv">
                   <Button  variant="outline-success" onClick={()=>{openPopup("create",popupCreate)}}>Crea una To-Do</Button>
                   <Button  variant="outline-info" onClick={()=>{openPopup("join",popupJoin)}}>Unisciti a una To-Do</Button>
               </div>
               <div className="cardsContainer">
                   <ToDoListCard title="Lista 1" date="12/01/2022" />
                   <ToDoListCard title="Lista 2" date="12/01/2022" />
               </div>
           </div>
       </div>



   )
}

export default MyToDoLists;