import '../styles/Home.css';
import SideBar from "./SideBar";
import Button from "react-bootstrap/Button";
import PopupWindow from "./PopupWindow";
function Home({openPopup,closePopup}) {

   const popupJoin = {
        title: "Unisciti a To Do",
       message: "Inserisci il codice d'invito",
       inputText: true,
       handleConfirm: () => {

        },
       handleClose: closePopup,
    }
    return (

        <div className="homeContainer">
            <div className="SideBarContainer">
                <SideBar nome="Diego" openPopup={openPopup} closePopup={closePopup}  />
            </div>
            <div className="restantePagina">
                <h1>Home</h1>
                <p id="welcomep" >Puoi iniziare a usare Tasky fin da subito :</p>
                <div className="HomeButtonsDiv">
                    <Button  variant="outline-success">Crea una To-Do</Button>
                    <Button  variant="outline-info" onClick={()=>{openPopup("join" , popupJoin)}}
                    >Unisciti a una To-Do</Button>
                </div>
            </div>
        </div>
    )
}



export default Home;