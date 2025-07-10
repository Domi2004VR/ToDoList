import '../styles/Home.css';
import SideBar from "./SideBar";
import Button from "react-bootstrap/Button";
function Home() {
    return (
        <div className="homeContainer">
            <div className="SideBarContainer">
                <SideBar nome="Diego"/>
            </div>
            <div className="restantePagina">
                <h1>Home</h1>
                <p id="welcomep" >Benvenuto nella home , inizia subito :</p>
                <div className="HomeButtonsDiv">
                    <Button  variant="outline-success">Crea una To-Do</Button>
                    <Button  variant="outline-info">Unisciti a una To-Do</Button>
                </div>
            </div>
        </div>
    )
}



export default Home;