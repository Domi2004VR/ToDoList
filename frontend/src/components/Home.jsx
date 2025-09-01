import '../styles/Home.css';
import SideBar from "./SideBar";
import Button from "react-bootstrap/Button";
import icon from '../assets/Icon.png';

function Home({openPopup,closePopup, user}) {
    return (

        <div className="homeContainer">
            <div className="SideBarContainer">
                <SideBar nome={user.nome} openPopup={openPopup} closePopup={closePopup}  />
            </div>
            <div className="restantePagina">
                <h1>Home</h1>
                <img src={icon} id="icon"></img>
                <p id="welcomep">
                    Questa applicazione nasce dall’idea di rendere semplice e organizzata la gestione delle attività
                    quotidiane, sia individuali che di gruppo. Grazie ad un’interfaccia intuitiva puoi creare,
                    modificare e condividere liste di cose da fare con chi vuoi, ovunque ti trovi.<br/><br/>
                    L’app supporta la collaborazione in tempo reale: ogni membro può aggiungere e completare
                    le attività, così tutti sono sempre aggiornati sullo stato dei lavori. Che tu sia uno studente, un
                    lavoratore o semplicemente una persona che vuole mantenere tutto sotto controllo, qui troverai uno
                    strumento pratico, moderno e sicuro.<br/><br/>
                    Inizia subito a creare la tua prima lista, invita i tuoi amici o colleghi, e scopri quanto può
                    essere semplice lavorare insieme!
                </p>
                <p id="PStart">Per iniziare puoi cliccare sulla sinistra il tasto <span>Le mie To-Do Lists</span> </p>
            </div>
        </div>
    )
}


export default Home;