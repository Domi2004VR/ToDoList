import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/SideBar.css";

function SideBar({nome}){

    return(
        <div className="sideBarContainer">
            <div id="welcomeDiv" className="sectionDiv">
                <p className="sideBarp">Benvenuto {nome}!</p>
            </div>
            <div className="sectionDiv">
                <p className="sideBarp">Home</p>
                <i className="sideBarIcon bi bi-caret-right"></i>
            </div>
            <div className="sectionDiv">
                <p className="sideBarp">Le mie To-Do List</p>
                <i className="sideBarIcon bi bi-caret-right"></i>
            </div>
            <div id="logoutDiv" className="sectionDiv">
                <div id="logoutRow">
                    <p className="sideBarp">Logout</p>
                    <i id="logoutButton" className="sideBarIcon bi bi-box-arrow-right"></i>
                </div>

            </div>
        </div>
    )
}

export default SideBar;

