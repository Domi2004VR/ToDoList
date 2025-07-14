import SideBar from "./SideBar";
import ToDoListCard from "./ToDoListCard";
import Button from 'react-bootstrap/Button';
import "../styles/myToDoLists.css";
import {useEffect} from "react";
import authFetch from "../authFetch";
import {openList} from "../services/api";

function MyToDoLists({todolist, todolists, setTodolists, openPopup, closePopup, user, listToOpen , setListToOpen}) {


    useEffect(() => {
        //se si entra nell'errore significa che c'è un'errore di passaggio riguardante il parametro dell'id dello user
        if (!user.id) return;

        authFetch(`http://localhost:3001/todolist/user/${user.id}`)
            .then(data => {
                console.log(data.todoLists);

                //cambio la data fornita dal db con il formato italiano da inserire nelle schede
                console.log("sono arrivato qui, prima di data.map");
                const formatted = data.todoLists.map(todo => ({
                    ...todo,
                    creationDate: new Date(todo.creationDate).toLocaleDateString('it-IT'),
                }));
                console.log("sono arrivato qui, dopo di data.map");
                setTodolists(formatted);
                console.log("sono arrivato qui, alla fine");
            })
            .catch(err => {
                console.error("Errore nel caricamento delle to-do:", err);
            });
    } , [user.id, todolist, todolists]); // quando viene rederizzato il componente MyToDoLists gli viene passato l'oggetto user da App.jsx e di conseguenza viene eseguita la fetch
                                                // ho aggiunto anche che viene eseguita la fetch quando cambia lo stato del todolist creato
                                                // inoltre anche quando si elimina il todolist tramite il cestino viene filtrato(con filter) lo stato todolists, ritriggerando la fetch



    return (
       <div className="myToDoListsContainer">
           <div className="SideBarContainer">
               <SideBar nome={user.nome} openPopup={openPopup} closePopup={closePopup}  />
           </div>
           <div className="RestantePagina">
               <h1 className="titleMyToDoListsPage">Le mie To-Do List</h1>
               <div className="myToDoButtonsDiv">
                   <Button  variant="outline-success" onClick={()=>{openPopup("create")}}>Crea una To-Do</Button>
                   <Button  variant="outline-info" onClick={()=>{openPopup("join")}}>Unisciti a una To-Do</Button>
               </div>
               <div className="cardsContainer">
                   {todolists.map((element) => (
                       <ToDoListCard listToOpen={listToOpen} setListToOpen={setListToOpen} userId={user.id} setTodolists={setTodolists} todolists={todolists} todolistId={element._id} title={element.title} date={element.creationDate} />
                   ))}

               </div>
           </div>
       </div>



   )
}

export default MyToDoLists;