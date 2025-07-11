import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PopupWindow from "./components/PopupWindow";
import {useState} from "react";
import Home from "./components/Home";
import MyToDoLists from "./components/MyToDoLists";


function App() {
    const [popup, setPopup] = useState({
        visible: false,
        type:null,   //Lo uso per determinare il tipo di popup che voglio visualizzare
        data:null   //Lo uso per passare i dati da visualizzare nel popup
    });
    const openPopup = (type,data) => {    //Funzione che apre il popup da passare a componenti figli
        setPopup({visible: true  , type:type, data:data});
    }
    const closePopup = () => {
        setPopup({visible: false, type: null, data: null}); //funzione che chiude il popup da passare a componenti figli
    }


    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<Home openPopup={openPopup}  closePopup={closePopup} />} />
                <Route path="/mytodolists" element={<MyToDoLists openPopup={openPopup}  closePopup={closePopup} />} />
            </Routes>
            {popup.visible && (
                <PopupWindow popupInfo={popup.data} />    /*Mostra una finestra con una richiesta con i dati passati dai figli memorizzati in popup.data*/
            )}
        </Router>
    )
}

export default App;
