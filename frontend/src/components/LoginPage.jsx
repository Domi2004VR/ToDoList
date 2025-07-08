import BlobLoginPage from "../assets/blobLogin.svg"
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import "../styles/LoginPage.css";

function LoginPage() {
    return(
        <div className="login-page">
            <div className="blobDiv">
                <img id="blob-svg" src={BlobLoginPage}/>
            </div>
            <div className="formDiv">
                <div className="InputDiv">
                    <h1>Benvenuto!</h1>

                    <form>
                    <FloatingLabel controlId="floatingEmail" label="Email"  className="mb-3">
                        <Form.Control type="email" placeholder="email" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password"  className="mb-3">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                    </form>

                    <Button variant="outline-primary" className="button">Login</Button>

                    <p>Non sei ancora registrato? <a href="http://localhost:3000/registrati">Registrati!</a> </p>

                </div>


            </div>

        </div>

    )
}

export default LoginPage;