import '../styles/Home.css';
import SideBar from "./SideBar";
import Button from "react-bootstrap/Button";
import PopupWindow from "./PopupWindow";
function Home({viewPopup, handlePopup}) {

   const popupHome = {
        title: "Unisciti a To Do",
       message: "Inserisci il codice d'invito",
       inputText: true,
       handleConfirm: () => {

        },
       handleClose: function () {handlePopup()},
    }

    return (
        <div className="homeContainer">
            {viewPopup === true?<PopupWindow popupInfo={popupHome} /> : null}

            <div className="SideBarContainer">
                <SideBar nome="Diego"/>
            </div>
            <div className="restantePagina">
                <h1>Home</h1>
                <p id="welcomep" >Benvenuto nella home , inizia subito :</p>
                <div className="HomeButtonsDiv">
                    <Button  variant="outline-success">Crea una To-Do</Button>
                    <Button  variant="outline-info" onClick={handlePopup}>Unisciti a una To-Do</Button>
                </div>
            </div>
        </div>
    )
}



export default Home;