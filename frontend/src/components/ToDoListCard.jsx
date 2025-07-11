import Button from 'react-bootstrap/Button';
import "../styles/ToDoListCard.css";


function ToDoListCard({title,date}){
    return(
        <div className="cardContainer">
            <p id="titleId">{title}</p>
            <p>Creata il {date}</p>
            <div className="buttonsDiv">
                <Button variant="outline-primary">Apri</Button>
                <i className="cestino bi bi-trash"></i>
            </div>
        </div>

    )
}

export default ToDoListCard;