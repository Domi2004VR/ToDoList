import Button from 'react-bootstrap/Button';
import {useState} from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import '../styles/PopupWindow.css'
import ErrorMessage from "./ErrorMessage";
import {useNavigate} from "react-router-dom";

function PopupWindow ({popupInfo}) {

    const [inputValue , setInputValue] = useState("");  //Stato per gestire il contenuto dell'input

    function handleChange (e) {   //funzione che gestisce il cambiamento del valore dell'input
        setInputValue(e.target.value);
    }

    return (
        <div className="popupOverlay">
            <div className="popupContainer">
                <h2 className="popupTitle">{popupInfo.title}</h2>
                <p className="popupDescription">{popupInfo.message}</p>
                {popupInfo.inputText.enable ?<div className="inputContainer">
                    <FloatingLabel controlId="floatingEmail" label={popupInfo.inputText.placeholder}  className=" inputContainer mb-3" >
                                <Form.Control id="popupInput" type="text" placeholder="" name="inputText" value={inputValue} onChange={handleChange} />
                            </FloatingLabel>
                    </div> : null}
                <div className="popupButtonsContainer">
                    <Button id="confirmButton" name="conferma" variant="outline-success" onClick={() => popupInfo.handleConfirm(inputValue)}>Conferma</Button>
                    <Button id="closeButton" name="annulla" variant="outline-danger" onClick={popupInfo.handleClose} >Annulla</Button>
                    <ErrorMessage message={popupInfo.errorMessage} />
                </div>
            </div>
        </div>
    )
}

export default PopupWindow;