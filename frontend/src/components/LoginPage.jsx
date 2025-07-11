import BlobLoginPage from "../assets/blobLogin.svg"
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import "../styles/LoginPage.css";
import {useState} from "react";
import ErrorMessage from "./ErrorMessage";
import {useNavigate} from "react-router-dom";


function LoginPage() {
    const navigate = useNavigate();

    const [LoginForm, setLoginForm] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState(null)

    function handleChange(e) {
        setLoginForm({...LoginForm, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' //serve per dire al server che gli sto inviando dei dati in formato json
            },
            body: JSON.stringify({
                email: LoginForm.email,
                password: LoginForm.password,
            })
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(data => {
                        throw new Error(data.message || "Errore durante il login");
                    });
                }
                return res.json();
            })
            .then(data => {
                setError(null); // login ok, nessun errore
                console.log("Login riuscito:", data);
                navigate("/Home");
            })
            .catch(err => {
                // Qui arrivi se è stato fatto `throw new Error(...)` e viene passato l'errore al catch (err)
                setError(err.message); //  mostra l’errore all’utente
                console.error("Errore:", err.message);
            });

    }

    return(
        <div className="login-page">
            <div className="blobDiv">
                <img id="blob-svg" src={BlobLoginPage}/>
            </div>
            <div className="formDiv">
                <div className="InputDiv">
                    <h1>Benvenuto!</h1>

                    <form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingEmail" label="Email"  className="mb-3" >
                        <Form.Control type="email" placeholder="email" name="email" value={LoginForm.email} onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password"  className="mb-3" >
                        <Form.Control type="password" placeholder="Password" name="password" value={LoginForm.password} onChange={handleChange} />
                    </FloatingLabel>


                    <Button type="submit" variant="outline-primary" className="button">Login</Button>
                    </form>

                    <p>Non sei ancora registrato? <a href="http://localhost:3000/register">Registrati!</a> </p>
                    <ErrorMessage message={error} />

                </div>


            </div>

        </div>

    )
}

export default LoginPage;