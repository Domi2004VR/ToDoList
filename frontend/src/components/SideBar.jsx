import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/SideBar.css";
import {logout} from "../services/api";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function SideBar({nome, openPopup ,closePopup }){
    const navigate = useNavigate();
    const [error,setError] = useState(null);
    function handleLogout(){
        console.log("Logout effettuato");
        logout()
            .then(res=>{
                navigate("/login");
                console.log("Logout effettuato");
            })
            .catch(err=>{
                setError(err.message);
                console.log("fetch non riuscita: ", err.message);
            })
    }


    return(
        <div className="sideBarContainer">
            <div id="welcomeDiv" className="sectionDiv">
                <p className="sideBarp" >Benvenuto {nome}!</p>
            </div>
            <div className="sectionDiv">
                <p onClick={() => navigate('/Home')} className="sideBarp">Home</p>
            </div>
            <div className="sectionDiv">
                <p onClick={() => navigate('/mytodolists')} className="sideBarp">Le mie To-Do List</p>
            </div>
            <div id="logoutDiv" className="sectionDiv">
                <div id="logoutRow">
                    <p onClick={()=>{openPopup("logout")}}  className="sideBarp">Logout</p>
                    <i onClick={()=>{openPopup("logout")}}  id="logoutButton" className="sideBarIcon bi bi-box-arrow-right"></i>
                </div>

            </div>
        </div>
    )
}

export default SideBar;

