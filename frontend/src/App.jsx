import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PopupWindow from "./components/PopupWindow";
import {useEffect, useState} from "react";
import Home from "./components/Home";
import MyToDoLists from "./components/MyToDoLists";
import ToDoList from "./components/ToDoList";
import {createTodo, joinTodo} from "./services/api";



function App() {
    const [user, setUser] = useState({
        id: "",
        nome: "",
        cognome: "",
        email: "",
    });
    const [inputValue , setInputValue] = useState("");  //Stato per gestire il contenuto dell'input di PopupWindow
    const [error,setError] = useState(null);
    //array di tutte le todolist dello user
    const [todolists, setTodolists] = useState([{}]);
    //Todo list creata
    const[todolist, setTodolist] = useState({});
    //stato per gestire il join di una todo
    const [listToJoin, setListToJoin ] = useState({});
    //stato per gestire il popup
    const [popup, setPopup] = useState({
        visible: false,
        data:null   //Lo uso per passare i dati da visualizzare nel popup
    });



    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [])


    const openPopup = (type) => {//Funzione che apre il popup che passo a componenti figli
        if (type === "create") {
            setPopup({data:popupCreate, visible: true});
        } else if (type === "join") {
            setPopup({data:popupJoin, visible: true})
        }
    }
    const closePopup = () => {
        setPopup({visible: false, type: null, data: null}); //funzione che chiude il popup da passare a componenti figli
    }

    function handleCreateTodo(inputValue) {
        console.log(inputValue)
        return createTodo(inputValue, user.id)
            .then((createdToDoList) => {

                // Formatto la data in stile dd-mm-yyyy
                const rawDate = new Date(createdToDoList.creationDate);
                const formattedDate = `${rawDate.getDate().toString().padStart(2, '0')}-${(rawDate.getMonth()+1).toString().padStart(2, '0')}-${rawDate.getFullYear()}`;

                // Crea una nuova copia dell'oggetto contenente tutte le informazioni della todolist con la data formattata
                const todoWithFormattedDate = {
                    ...createdToDoList,
                    creationDate: formattedDate, // sovrascrive il campo originale della data
                };
                setTodolist({...todolist, todoWithFormattedDate});
                closePopup();

            })

    }


    function handleJoinTodo(inputValue){
        console.log(inputValue);
        joinTodo(inputValue, user.id)
            .then ((data) =>{
                console.log("Questo mi arriva dal backend " + JSON.stringify(data) );
                setListToJoin(data);
                window.location.href = "http://localhost:3000/mytodo";
                closePopup();
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


    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
                <Route path="/register" element={<RegisterPage user={user} setUser={setUser} />} />
                <Route path="/home" element={<Home todolists={todolists} setTodolists={setTodolists} user={user} openPopup={openPopup} closePopup={closePopup} />} />
                <Route path="/mytodolists" element={<MyToDoLists todolist={todolist} todolists={todolists} setTodolists={setTodolists} user={user} openPopup={openPopup}  closePopup={closePopup} />} />
                <Route path="/mytodo" element={<ToDoList  listToOpen ={listToJoin} openPopup={openPopup}  closePopup={closePopup} />} />
            </Routes>
            {popup.visible && (
                <PopupWindow popupInfo={popup.data} inputValue={inputValue} setInputValue={setInputValue} />    /*Mostra una finestra con una richiesta con i dati passati dai figli memorizzati in popup.data*/
            )}
        </Router>
    )
}

export default App;
