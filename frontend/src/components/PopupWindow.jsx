import Button from 'react-bootstrap/Button';
import {useState} from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import '../styles/PopupWindow.module.css'

function PopupWindow ({title, message, inputText , handleClose, handleConfirm}) {

    const [code, setCode] = useState("");


    function handleChange (e) {
        setCode(e.target.value);
    }


    return (
        <div className="popupContainer">
            <h2 className="popupTitle">{title}</h2>
            <p className="popupDescription">{message}</p>
            {inputText? <FloatingLabel controlId="floatingEmail" label="Inserici il codice"  className="mb-3" >
                            <Form.Control id="popupInput" type="text" placeholder="Inserici il codice" name="code" value={code} onChange={handleChange} />
                        </FloatingLabel>
                : null}
            <div className="popupButtonsContainer">
                <Button id="confirmButton" name="conferma" variant="success" onClick={handleConfirm}>Conferma</Button>
                <Button id="closeButton" name="annulla" variant="danger" onClick={handleClose}>Annulla</Button>
            </div>
        </div>
    )
}

export default PopupWindow;