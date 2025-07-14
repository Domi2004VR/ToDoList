import Button from 'react-bootstrap/Button';
import "../styles/ToDoListCard.css";
import {deleteTodo} from "../services/api";
import {openList} from "../services/api";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


function ToDoListCard({ listToOpen, setListToOpen ,userId,setTodolists, todolists, title, date, todolistId}) {


    const navigate = useNavigate();

    function handleRemoveToDoList () {
        deleteTodo(userId, todolistId )
        const toDoListsFiltered= todolists.filter(element => { return todolistId !== element._id
        })
        setTodolists(toDoListsFiltered)
    }

    function handleOpen(){
        openList(todolistId)
            .then(toDoListToOpen => {
                setListToOpen(toDoListToOpen)
                navigate(`${todolistId}`)
            })
    }

    return(

        <div className="cardContainer">
            <p id="titleId">{title}</p>
            <p>Creata il {date}</p>
            <div className="buttonsDiv">
                <Button onClick={handleOpen} variant="outline-primary">Apri</Button>
                <i id={todolistId} onClick={handleRemoveToDoList} className="cestino bi bi-trash"></i>
            </div>
        </div>

    )
}

export default ToDoListCard;