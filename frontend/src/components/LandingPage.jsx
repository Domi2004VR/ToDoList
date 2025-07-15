import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import blob from '../assets/blobLanding.svg'
import '../styles/LandingPage.css'
function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="loginPage">
            <div className="blob">
                <img id="blob-svg" src={blob}/>
            </div>
            <div className="landingText">
                <h1>Inizia subito a creare le tue <span> To-Do List</span>!</h1>
                <p>Una to-do list è un’applicazione che permette di annotare, organizzare e gestire facilmente attività o compiti da svolgere</p>
                <div className="buttonsLandingDiv">
                    <Button className="BtnLanding" onClick={()=>navigate('/login')} variant="outline-warning" id="loginButton">Login</Button>
                    <Button className="BtnLanding" onClick={()=>navigate('/register')} variant= "outline-warning" id="registerButton">Registrati</Button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;