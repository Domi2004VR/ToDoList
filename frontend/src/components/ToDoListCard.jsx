import Button from 'react-bootstrap/Button';
import "../styles/ToDoListCard.css";
import {deleteTodo} from "../services/api";
import {openList} from "../services/api";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


function ToDoListCard({ userId,setTodolists, todolists, title, date, todolistId}) {

    const[listToOpen, setListToOpen] = useState({});

    const navigate = useNavigate();

    console.log(userId + " " + todolistId);

    function handleRemoveToDoList (e) {
        console.log("questo è l'id dell'utente da eliminare" + userId);
        console.log("questo è l'id della lista da eliminare" + todolistId);
        deleteTodo(userId, todolistId )
        console.log("la funzione handle remove viene eseguita")
        const toDoListsFiltered= todolists.filter(element => { return todolistId !== element.id
        })
        setTodolists(toDoListsFiltered)
    }

    function handleOpen(){
        openList(todolistId)
            .then(toDoListToOpen => {
                setListToOpen(toDoListToOpen)
                navigate('http://localhost:3000/mytodo')
            })
    }

    return(

        <div className="cardContainer">
            <p id="titleId">{title}</p>
            <p>Creata il {date}</p>
            <div className="buttonsDiv">
                <Button variant="outline-primary">Apri</Button>
                <i id={todolistId} onClick={handleRemoveToDoList} className="cestino bi bi-trash"></i>
            </div>
        </div>

    )
}

export default ToDoListCard;