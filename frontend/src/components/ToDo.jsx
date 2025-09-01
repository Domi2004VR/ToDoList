import Form from "react-bootstrap/Form";
import "bootstrap-icons/font/bootstrap-icons.css"
import {useEffect, useState} from "react";
import {deleteTask, handleTask, updateTask} from "../services/api";
import socket from "../services/socket";


function ToDo ({onRemove, description, isDisabled, setIsDisabled, toDoes, setToDoes, todo, id, done, setDone}) {
   //Stato per gestire l'utente che sta modificando una task
    const [isEditing, setIsEditing] = useState(false);
    //Stato per memorizzare la nuova descrizione inserita dall'utente
    const [editedDescription, setEditedDescription] = useState(description);
    //Stato per mantenere la vecchia descrizione in caso di annullamento modifiche
    const [originalDescription, setOriginalDescription] = useState(description);



    //Imposta editedDescription a ogni variazione dell'input text
    function handleInputChange(event) {
        setEditedDescription(event.target.value);
    }

    //Serve per reimpostare la descrizione uguale a quella originale fornita dal server
    function handleCancelEdit() {
        setEditedDescription(originalDescription); // reimposta la descrizione che aveva prima della modifica
        setIsEditing(false);    //disabilità l'input
    }

    //Quando schiaccio il tasto per modifica (matita) salvo la descrizione presente in quel momento in OriginalDescription
    function handleEditClick() {
        setOriginalDescription(editedDescription); // salva lo descrizione attuale prima della modifica
        setIsEditing(true);                 //abilita la possibilità di scrivere in input
    }

    //Funzione che conferma i cambiamenti in maniera definitiva
    function handleConfirmEdit() {
        // aggiorna la descrizione nel frontend
        const updatedToDos = toDoes.map((task) => {
            if (task._id === todo._id) {   //Cambia la descrizione lato frontend solo per il task modificato
                return { ...task, description: editedDescription };
            }
            return task;
        });

        setToDoes(updatedToDos);    //Salva la nuova lista di to do con descrizione modificata nello stato toDoes
        updateTask(todo._id, editedDescription) //questo aggiorna il backend
        setIsEditing(false); //Disabilita l'input text

    }


    function handleDone () {
        //Inverto la condizione in maniera che lo stato anche se non aggiornato non influisce sul backend
        //Sono costretto a fare così perchè lo stato non si aggiorna in tempo reale ma al prossimo rendering
        const newDone = !todo.isDone;
        //Emetto l'evento Completed task quando qualcuno spunta un To DO , passo come dati se è completato o ripristinato e la sua descrizione
        socket.emit('CompletedTask' , { id:todo._id , isDone:newDone, description : editedDescription})
        //Aggiorno il backend
        handleTask(todo._id, newDone);
        //Aggiorno il frontend impostando lo stato del task su Done solo per il task con l'id ricevuto
        setToDoes(prevToDoes=> prevToDoes.map((element)=>{
            if(todo._id === element._id){
                return {...element, isDone: newDone};
            }
            return element;
        }));


    }

    function handleRemove () {
        deleteTask(todo._id)  //Aggiorna backend eliminando la task dal database
        //Elimina la task lato frontend cambiando lo stato to Does senza la task con id selezionato,
        // viene triggarato il re-rendering poichè il map è fatto su To Does(che renderizza il componente To-Do.jsx) che viene modificato
        setToDoes(toDoes.filter((element) => element._id !== todo._id));
    }



    useEffect(() => {
        //Aggiungo un evenetLitener per TaskNotify che ricevo dal server
        socket.on('TaskNotify' , (data)=>  {
            setToDoes(prevtoDoes => prevtoDoes.map((element)=>{  //prevtoDoes è lo stato toDoes nella sua versione più aggiornata possibile a differenza
                // di todoes che è la versione aggiornata alla creaione di useEffect (closure datata)
                if(data.id === element._id){
                    return {...element, isDone: data.isDone};
                }
                return element;
            }))
            //Eseguo questo codice quando ricevo TaskNotify dal server
            if(data.isDone === true) {
                //Emetto un alert positiva se la task è completata
                alert(`Task ${data.description} completata con successo!`)
            }else{
                //emetto un alert con task ripristinata se la task viene resettata a non fatta
                alert(`Task ${data.description} ripristinata con successo!`)
            }

        });
        //Rimuovo l'eventListener dopo aver ricevuto una volta l'evento , se lo lasciassi ogni volta che useEffect viene triggerato aggiungerebbe un altro listener
        return ()=> socket.off('TaskNotify');
    },[])  //Monta una volta il listener quando la pagina viene caricata





    return (

        <div className="ToDoContainer">
            <div className="checkBoxToDoContainer">
                <Form.Check  id="checkBoxToDo" checked={todo.isDone} onChange={handleDone} aria-label="option 1" />
            </div>
            <Form.Control  className='textToDo' type="text" name="inputTextToDo" disabled={!isEditing} value={editedDescription} onChange={handleInputChange}/>
            {isEditing ? (  /*Se lo stato isEditing è true mostro  icone conferma e annulla */
                <div className="toDoButtonsContainer">
                    <button className="icon-button confirmEditToDoButton" onClick={handleConfirmEdit}>
                        <i className="iconsToDo bi bi-check-circle"></i>
                    </button>
                    <button className="icon-button cancelEditToDoButton" onClick={handleCancelEdit}>
                        <i id="removeToDo" className="icon-button bi bi-x-circle"></i>
                    </button>
                </div>
                ) : ( /*Se lo stato isEditing è false mostro icone matita e cestino */
                    <div className="toDoButtonsContainer">
                        <button className="icon-button editToDoButton" onClick={handleEditClick}>
                            <i className="iconsToDo bi bi-pencil"></i>
                        </button>
                        <button className="icon-button removeToDoButton" onClick={handleRemove}>
                            <i className="iconsToDo bi bi-trash"></i>
                        </button>
                    </div>
            )}

        </div>
    )
}

export default ToDo