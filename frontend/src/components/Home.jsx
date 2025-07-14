import '../styles/Home.css';
import SideBar from "./SideBar";
import Button from "react-bootstrap/Button";
function Home({openPopup,closePopup, user}) {

    return (

        <div className="homeContainer">
            <div className="SideBarContainer">
                <SideBar nome={user.nome} openPopup={openPopup} closePopup={closePopup}  />
            </div>
            <div className="restantePagina">
                <h1>Home</h1>
                <p id="welcomep" >Puoi iniziare a usare Tasky fin da subito :</p>
                <div className="HomeButtonsDiv">
                    <Button  variant="outline-success" onClick={()=>{openPopup("create" )}}>Crea una To-Do</Button>
                    <Button  variant="outline-info" onClick={()=>{openPopup("join" )}}>Unisciti a una To-Do</Button>
                </div>
            </div>
        </div>
    )
}



export default Home;