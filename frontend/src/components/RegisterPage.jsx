import BlobRegisterPage from "../assets/blobRegister.svg"
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import "../styles/RegisterPage.css";

function RegisterPage() {
    return(
        <div className="register-page">
            <div className="blobDiv">
                <img id="blob-svg" src={BlobRegisterPage}/>
            </div>
            <div className="formDiv">
                <div className="InputDiv">
                    <form>
                        <h1>Inizia subito la tua registrazione!</h1>
                        <FloatingLabel controlId="floatingName" label="Nome"  className="mb-3">
                            <Form.Control type="text" placeholder="Nome" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingSurname" label="Cognome"  className="mb-3">
                            <Form.Control type="text" placeholder="Cognome" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingEmail" label="Email"  className="mb-3">
                            <Form.Control type="email" placeholder="email" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password"  className="mb-3">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Ripeti password"  className="mb-3">
                            <Form.Control type="password" placeholder="Ripeti password" />
                        </FloatingLabel>

                        <Button  variant="outline-primary" className="button">Registrati!</Button>
                    </form>
                </div>

            </div>

        </div>

    )
}

export default RegisterPage;