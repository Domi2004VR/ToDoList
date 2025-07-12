import '../styles/Home.css';
import SideBar from "./SideBar";
import Button from "react-bootstrap/Button";
import {createTodo} from "../services/api";
import {joinTodo} from "../services/api";
import {useState} from "react";
function Home({openPopup,closePopup, user}) {

    const [error,setError] = useState(null);

    function handleCreateTodo(title){
        openPopup("create" , popupCreate)
        createTodo(title)
            .then(res => {
                const newTodo = res.body.todoList; //Se ricevo la nuova To-do creata dalla API che fa la fetch la salvo in newTodo per poi usarla
                //aggiungo la parte che ti collega alla pagina todolist
            })
            .catch(err => {   //Se ricevo un errore dalla API che fa la fetch per creare una To-Do salvo nello stato
                setError(err.message);
            })
    }
    function handleJoinTodo(code){
        openPopup("join" , popupJoin)
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

        <div className="homeContainer">
            <div className="SideBarContainer">
                <SideBar nome={user.nome} openPopup={openPopup} closePopup={closePopup}  />
            </div>
            <div className="restantePagina">
                <h1>Home</h1>
                <p id="welcomep" >Puoi iniziare a usare Tasky fin da subito :</p>
                <div className="HomeButtonsDiv">
                    <Button  variant="outline-success" onClick={()=>{openPopup("create" , popupCreate)}}>Crea una To-Do</Button>
                    <Button  variant="outline-info" onClick={()=>{openPopup("join" , popupJoin)}}>Unisciti a una To-Do</Button>
                </div>
            </div>
        </div>
    )
}



export default Home;