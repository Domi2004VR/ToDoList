import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/MyToDoLists";
import PopupWindow from "./components/PopupWindow";
import {useState} from "react";
import Home from "./components/Home";
import MyToDoLists from "./components/MyToDoLists";
import ToDoList from "./components/ToDoList";

function App() {
    const [viewPopup, setViewPopup] = useState(false);

    function handlePopup () {
        console.log("Ciao io solo handlePopup");
        if (viewPopup === true) {
            setViewPopup(false);
        } else if (viewPopup === false) {
            setViewPopup(true);
        }
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<Home viewPopup={viewPopup} handlePopup={handlePopup} />} />
                <Route path="/mytodolists" element={<MyToDoLists viewPopup={viewPopup} handlePopup={handlePopup} />} />
                <Route path="/popup" element={<PopupWindow />} />
                <Route path="/todo" element={<ToDoList />} />
            </Routes>
        </Router>
    )
}

export default App;
