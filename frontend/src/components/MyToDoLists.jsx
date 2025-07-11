import SideBar from "./SideBar";
import ToDoListCard from "./ToDoListCard";
import Button from 'react-bootstrap/Button';
import "../styles/myToDoLists.css";
import PopupWindow from "./PopupWindow";

function MyToDoLists({viewPopup, handlePopup}) {

    const popupMyToDoList = {
        title: "Unisciti a To Do",
        message: "Inserisci il codice d'invito",
        inputText: true,
        handleConfirm: () => {

        },
        handleClose: function () {handlePopup()},
    }

   return (
       <div className="myToDoListsContainer">
           {viewPopup === true?<PopupWindow popupInfo={popupMyToDoList} /> : null}
           <div className="SideBarContainer">
               <SideBar nome="Diego"/>
           </div>
           <div className="RestantePagina">
               <h1 className="titleMyToDoListsPage">Le mie To-Do List</h1>
               <div className="myToDoButtonsDiv">
                   <Button  variant="outline-success">Crea una To-Do</Button>
                   <Button  variant="outline-info" onClick={handlePopup}>Unisciti a una To-Do</Button>
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