import Button from 'react-bootstrap/Button';
import {useState} from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import '../styles/PopupWindow.css'

function PopupWindow ({popupInfo}) {

    const [code, setCode] = useState("");

    function handleChange (e) {
        setCode(e.target.value);
    }


    return (
        <div className="popupOverlay">
            <div className="popupContainer">
                <h2 className="popupTitle">{popupInfo.title}</h2>
                <p className="popupDescription">{popupInfo.message}</p>
                {popupInfo.inputText?<div className="inputContainer">
                    <FloatingLabel controlId="floatingEmail" label="Inserici il codice"  className=" inputContainer mb-3" >
                                <Form.Control id="popupInput" type="text" placeholder="Inserici il codice" name="code" value={code} onChange={handleChange} />
                            </FloatingLabel>
                    </div> : null}
                <div className="popupButtonsContainer">
                    <Button id="confirmButton" name="conferma" variant="outline-success" onClick={popupInfo.handleConfirm}>Conferma</Button>
                    <Button id="closeButton" name="annulla" variant="outline-danger" onClick={popupInfo.handleClose}>Annulla</Button>
                </div>
            </div>
        </div>
    )
}

export default PopupWindow;