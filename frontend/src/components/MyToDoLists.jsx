import SideBar from "./SideBar";
import ToDoListCard from "./ToDoListCard";
import Button from 'react-bootstrap/Button';
import "../styles/myToDoLists.css";
import PopupWindow from "./PopupWindow";

function MyToDoLists({openPopup,closePopup}) {

    const popupJoin = {
        title: "Unisciti a To Do",
        message: "Inserisci il codice d'invito",
        inputText: true,
        handleConfirm: () => {

        },
        handleClose: function () {closePopup()},
    }

    return (
       <div className="myToDoListsContainer">
           <div className="SideBarContainer">
               <SideBar nome="Diego" openPopup={openPopup} closePopup={closePopup}  />
           </div>
           <div className="RestantePagina">
               <h1>Le mie To-Do List</h1>
               <div className="myToDoButtonsDiv">
                   <Button  variant="outline-success">Crea una To-Do</Button>
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