import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PopupWindow from "./components/PopupWindow";
import {useEffect, useState} from "react";
import Home from "./components/Home";
import MyToDoLists from "./components/MyToDoLists";
import ToDoList from "./components/ToDoList";
import {createTodo, joinTodo, logout} from "./services/api";

import toDoList from "./components/ToDoList";



function App() {
    const [user, setUser] = useState({
        id: "",
        nome: "",
        cognome: "",
        email: "",
    });
    const [inputValue , setInputValue] = useState("");  //Stato per gestire il contenuto dell'input di PopupWindow
    const [error,setError] = useState(null);

    //array di tutte le to do list dello user
    const [todolists, setTodolists] = useState([{}]);

    //to do list creata
    const[todolist, setTodolist] = useState({});

    //stato per gestire il popup
    const [popup, setPopup] = useState({
        visible: false,
        data:null   //Lo uso per passare i dati da visualizzare nel popup
    });

    //stato per aprire la lista specifica dell'utente
    const[listToOpen, setListToOpen] = useState({});


    //funzione che recupera l'utente dal localstorage e lo setta nello stato user (solo una volta, quando si avvia l'app o si aggiorna la pagina)
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); //parse serve a convertire da JSON a OGGETTO JS
        }
    }, [])


    const openPopup = (type) => {//Funzione che apre il popup che passo a componenti figli
        if (type === "create") {
            setPopup({data:popupCreate, visible: true});
        } else if (type === "join") {
            setPopup({data:popupJoin, visible: true})
        } else if (type === "logout") {
            setPopup({data:popupLogout , visible: true})
        }
    }

    const closePopup = () => {
        setPopup({visible: false, type: null, data: null}); //funzione che chiude il popup da passare a componenti figli
        setInputValue(" ");
    }

    function formatDate(date){
        const rawDate = new Date(date);
        return `${rawDate.getDate().toString().padStart(2, '0')}-${(rawDate.getMonth()+1).toString().padStart(2, '0')}-${rawDate.getFullYear()}`;

    }
    function handleCreateTodo(inputValue) {
        console.log(inputValue)
        return createTodo(inputValue, user.id)
            .then((createdToDoList) => {

                // Formatto la data in stile dd-mm-yyyy
                const formattedDate = formatDate(createdToDoList.creationDate);
                // Crea una nuova copia dell'oggetto contenente tutte le informazioni della todolist con la data formattata
                const todoWithFormattedDate = {
                    ...createdToDoList,
                    creationDate: formattedDate, // sovrascrive il campo originale della data
                };
                setTodolist({...todolist, todoWithFormattedDate});
                setTodolists([...todolists, todoWithFormattedDate]);
                closePopup();

            })

    }


    function handleJoinTodo(inputValue) {
       console.log(inputValue)
        joinTodo(inputValue, user.id)
            .then((data) => {
                console.log("Sto joinando una todo" );
                console.log(data.creationDate);
                const formattedDate = formatDate(data.creationDate);
                const todoWithFormattedDate = {
                    ...data,
                    creationDate: formattedDate, // sovrascrive il campo originale della data
                };
                setListToOpen({...listToOpen, todoWithFormattedDate}); //Aggiorno la lista delle to-do list con la nuova lista con data formattata
                setTodolists([...todolists, todoWithFormattedDate]);  //Aggiorno la lista delle mie to-do lists

                closePopup();
            })
    }

    function handleLogout(){
        logout()
            .then(res=>{
                window.location.href = ("http://localhost:3000/login");
                localStorage.removeItem("user");
                localStorage.removeItem("jwt");
            })
            .catch(err=>{
                setError(err.message);
                console.log("C'è stato un errore durante il logout", err.message);
            })
    }

    const popupJoin = {   //proprietà da passare al popup window per la finestra di unione a una To-Do
        title: "Unisciti a To Do",
        message: "Inserisci il codice d'invito",
        inputText:{
            enable: true,
            placeholder: "Inserisci il codice d'invito",
            value: ""
        },
        errorMessage: error,
        handleConfirm:handleJoinTodo,
        handleClose: closePopup,
    }
    const popupCreate = {           //proprietà da passare al popup window per la finestra di creazione di una To-Do
        title: "Crea una To-Do",
        message: "Inserisci il nome della To-Do",
        inputText:{
            enable: true,
            placeholder: "Inserisci il nome della To-Do",
            value: ""
        },
        errorMessage: error,
        handleConfirm: handleCreateTodo,
        handleClose: closePopup,
    }
    const popupLogout={
        title: "Sei sicuro di voler effettuare il logout?",
            message: "Effettuando il logout verrai disconnesso immediatamente ",
            inputText:{
            enable: false,
                placeholder: "",
                value: ""
        },
        errorMessage: error,
            handleConfirm: handleLogout,
            handleClose: closePopup
    }


    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
                <Route path="/register" element={<RegisterPage user={user} setUser={setUser} />} />
                <Route path="/home" element={<Home todolists={todolists} setTodolists={setTodolists} user={user} openPopup={openPopup} closePopup={closePopup} />}/>
                <Route path="/mytodolists" element={<MyToDoLists listToOpen={listToOpen} setListToOpen={setListToOpen} todolist={todolist} todolists={todolists} setTodolists={setTodolists} user={user} openPopup={openPopup}  closePopup={closePopup} />} />
                <Route path="/mytodolists/:listId" element={<ToDoList user={user} listToOpen={listToOpen} setListToOpen={setListToOpen} openPopup={openPopup}  closePopup={closePopup} />} />
            </Routes>
            {popup.visible && (
                <PopupWindow popupInfo={popup.data} inputValue={inputValue} setInputValue={setInputValue} />    /*Mostra una finestra con una richiesta con i dati passati dai figli memorizzati in popup.data*/
            )}
        </Router>
    )
}

export default App;
