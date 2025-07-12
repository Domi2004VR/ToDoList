import BlobRegisterPage from "../assets/blobRegister.svg"
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import "../styles/RegisterPage.css";
import {useState} from "react";
import ErrorMessage from "./ErrorMessage";
import {useNavigate} from "react-router-dom";

function RegisterPage({user, setUser}) {
    const navigate = useNavigate();
    const [RegisterForm , SetRegisterForm] = useState({
        nome:"",
        cognome:"",
        email:"",
        password:"",
        password2:""
    });   //creo stato e setter per la risposta
    const [error, setError] = useState(null);           //creo stato e setter per un eventuale errorem


    function handleChange(e){
        SetRegisterForm({...RegisterForm, [e.target.name]:e.target.value});     //Funzione che a ogni cambiato del argomento aggiorna l'oggetto risposta
    }
    async function handleSubmit(e) {
      e.preventDefault();  //Evito il comportamento predefinito del form

      fetch('http://localhost:3001/auth/register', {
          method : 'POST' ,
          headers: {
              'Content-Type': 'application/json'  //Serve ad avvisare il server che i dati che gli sto per mandare sono in formato JSON
          },
          credentials: 'include',

          body: JSON.stringify({    //Passo in formato JSON tramite POST al server i dati raccolti nel form per la registrazione
              nome: RegisterForm.nome,
              cognome:RegisterForm.cognome,
              email:RegisterForm.email,
              password:RegisterForm.password,
              password2:RegisterForm.password2,
        })
      })
          .then((res)=>{
              if(!res.ok){                      //Se la risposta da parte del server è negativa creo un errore con il messaggio dato dal server e restituisco la risposta in JSON
                  return res.json().then( (data)=>{
                      throw new Error(data.message || "Errore durante la registrazione");
                  })
              }
              return res.json();              //Se la risposta da parte del server è positiva restutisco la risposta in formato JSON
          })
          .then((data)=>{  //Se tutto è andato a buon fine prendo il valore di res.json e lo memorizzo in data per poi elaborarlo
              setError(null);           //non ho errori
              console.log("Registrazione avvenuta con successo", data);
              localStorage.setItem("jwt", data.accessToken);
              setUser({
                  id: data.id,
                  nome:data.nome,
                  cognome:data.cognome,
                  email: data.email});
              navigate("/Home");   //Reindirizzo su dashboard
          })
          .catch((err)=>{
              //Si entra in questo catch se la risposta del server è negativa e si entra in Throw new error
              setError(err.message);   //Imposto l'errore e poi tramite il componente ErrorMessage lo mostro
              console.error("Errore:", err.message);
          });
        }

    return(
        <div className="register-page">
            <div className="blobDiv">
                <img id="blob-svg" src={BlobRegisterPage}/>
            </div>
            <div className="formDiv">
                <div className="InputDiv">
                    <h1>Inizia subito la tua registrazione!</h1>
                    <form  onSubmit={handleSubmit}>   {/*Quando viene schiacciato il bottone invia la risposta al backend tramite la funzione handleSubmit*/}
                        <FloatingLabel controlId="floatingName" label="Nome" name="nome" className="mb-3">
                            <Form.Control  type="text" placeholder="Nome" name="nome"  value={RegisterForm.nome} onChange={handleChange}   />  {/*Aggiorno il valore del nome in tempo reale dentro lo stato RegisterForm tramite handleChange*/}
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingSurname" label="Cognome"  className="mb-3">
                        <Form.Control type="text" placeholder="Cognome" name="cognome" value={RegisterForm.cognome} onChange={handleChange} /> {/*Aggiorno il valore del cognome in tempo reale dentro lo stato RegisterForm tramite handleChange*/}
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingEmail" label="Email"  className="mb-3">
                            <Form.Control type="email" placeholder="email" name="email" value={RegisterForm.email} onChange={handleChange}/>  {/*Aggiorno il valore del email in tempo reale dentro lo stato RegisterForm tramite handleChange*/}
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password"  className="mb-3">
                            <Form.Control type="password" placeholder="Password" name="password" value={RegisterForm.password} onChange={handleChange}/> {/*Aggiorno il valore della password in tempo reale dentro lo stato RegisterForm tramite handleChange*/}
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Ripeti password"  className="mb-3">
                            <Form.Control type="password" placeholder="Ripeti password" name="password2" value={RegisterForm.password2} onChange={handleChange} />   {/*Aggiorno il valore della password 2 in tempo reale dentro lo stato RegisterForm tramite handleChange*/}
                        </FloatingLabel>

                        <Button type="submit" variant="outline-primary"  className="button">Registrati!</Button>
                        <ErrorMessage message={error} />      {/*Componente per mostrare un errore*/}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default RegisterPage;