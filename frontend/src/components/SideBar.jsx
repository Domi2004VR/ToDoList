import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/SideBar.css";

function SideBar({nome, openPopup ,closePopup }){
    const popupLogout={
        title: "Sei sicuro di voler uscire?",
        message: "Se clicchi conferma verrai disconnesso immediatamente",
        inputText: false,
        handleConfirm: () => {
        },
        handleClose: function () {closePopup()},
    }

    return(
        <div className="sideBarContainer">
            <div id="welcomeDiv" className="sectionDiv">
                <p className="sideBarp">Benvenuto {nome}!</p>
            </div>
            <div className="sectionDiv">
                <p className="sideBarp">Home</p>
            </div>
            <div className="sectionDiv">
                <p className="sideBarp">Le mie To-Do List</p>
            </div>
            <div id="logoutDiv" className="sectionDiv">
                <div id="logoutRow">
                    <p onClick={()=>{openPopup("logout",popupLogout)}}  className="sideBarp">Logout</p>
                    <i onClick={()=>{openPopup("logout",popupLogout)}}  id="logoutButton" className="sideBarIcon bi bi-box-arrow-right"></i>
                </div>

            </div>
        </div>
    )
}

export default SideBar;

