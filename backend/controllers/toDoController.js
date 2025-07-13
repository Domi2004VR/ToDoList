const ToDoList = require('../models/toDoListModel');
const User = require("../models/userModel");

exports.getToDoListsByUser = (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(401).json({message: "è richiesto l'id utente per poter caricare correttamente le todo lists correlate"});
    }

    ToDoList.find({ members: userId })
        .then(todoLists => {

            res.status(200).json({ todoLists: todoLists });
        })
        .catch(err => {
            res.status(500).json({ message: "Errore nel recupero delle todo List" });
        });
};

exports.createToDoList = (req,res) => {
    //Creo una funzione per generare codici di invito casuali
    const generateInviteCode = () => {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }
    //salvo nella variabile title il titolo passatomi dal body della request
    const title = req.body.title;
    const userId = req.body.userId;
    //Se il title è vuoto ritorno un errore 401
    console.log ('ti sto per mandare il titolo: ' + title);
    console.log ('ti sto per mandare lo userid: ' + userId);

    if(!title){
        return res.status(401).json({message: "title mancante"})
    }
    ToDoList.findOne({title:title})
        .then(todoListFind => {   //Questo controlla fra tutte le liste non solo quelle relative all'utente che sta effettuando la richiesta ma anche quelle relative ad altri utenti'
            if(todoListFind){
                return res.status(400).json({message:"Questo titolo è già stato utilizzato "})
            }

    //Se non trovo nessuna lista con questo titolo ne creo una nuova
    ToDoList.create({
        title: title,
        creator: userId, //lo devo ancora prendere da qualche parte
        tasks:[],
        inviteCode: generateInviteCode() , //uso una funzione che genera un codice casuale per l'invito
        members:[userId],
    })
        .then(CreatedToDoList => {
            res.status(201).json({message: "ToDoList creata", todoList: CreatedToDoList})  //resituisco al frontend la nuova lista creata
        })
        })
    .catch(err => {
            res.status(500).json({message: "Errore interno del server"})  //Qualcosa nella creazione della lista non va a buon fine
    })
}

exports.deleteToDoList = (req, res) => {
    const {todolistId, userId} = req.body
    if (!todolistId) {
        return res.status(400).json({message: "serve l'id della to do list per eliminarla"})
    }
    if (!userId) {
        return res.status(400).json({message: "serve l'id dell'utente associato per eliminare la to do list"})
    }
    ToDoList.findOne({_id:todolistId, creator: userId})
        .then(todoListFindByCreatorId => {
            if(!todoListFindByCreatorId){
                console.log("l'utente non è il creatore della lista")
                //se l'utente non è il creatore, controllo se appartiene ai membri
                return ToDoList.findOne({_id:todolistId, members: userId})
                    .then(userFind => {
                        if(!userFind){
                            return res.status(400).json({message:"non esiste nessun utente membro con quell'id che partecipa questa lista"})
                        }

                        //cerco la lista con todolistId nella collezione ToDoList e aggiorno la lista trovata secondo l'oggetto specificato come secondo parametro
                        ToDoList.findByIdAndUpdate(todolistId, {

                            //se l'utente è un membro e non il creatore della lista, semplicemente viene rimosso l'id dell'utente dai membri
                            $pull : {members: userId}, //questo metodo permette di rimuovere ($pull) userId dall'array di membri chiamato members
                        }, {new: true}) //serve per restituire il nuovo documento(tutto il nuovo documento, non solo members) aggiornato, senza quel member

                            .then(updatedToDo => {
                                return res.status(200).json({
                                    message:'il membro è stato eliminato con successo',
                                    updatedToDo: updatedToDo
                                })
                            })

                    })
            }
            return ToDoList.deleteOne({_id: todolistId})
            .then(deletedToDo => {
                res.status(200).json({message: "la to do list è stata eliminata con successo"})
            })
        })
}
//middleware per accedere alla to do list tramite id
exports.openToDoList = (req,res) => {
    //l'id viene passato tramite parametro nell'url (perchè è destinato ad una richiesta get)
    const {listId} = req.params
    if (!listId){ //se è vuoto listId allora lancia un errore
        return res.status(400).json({message:"è necessario l'id della to do list"})
    }
    //altrimenti se tutto va a buon fine fa una ricerca nella collezione ToDoList tramite id
    ToDoList.findOne({_id:listId})
        .then(todoListFind => {
            if(!todoListFind){ //se non trova nessuna todolist lancia un errore
                return res.status(404).json({message: "non esiste nessun lista con questo id"})
            }
            //altrimenti risponde con un messaggio e con l'oggetto documento intero
            res.status(200).json({
                message: "lista recuperata con successo",
                todoList: todoListFind
            })

        })
        //catturo tutti gli eventuali problemi dovuti a malfunzionamenti interni del server
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Errore interno del server "})
        })

}


exports.joinToDoList = (req,res,next) => {
    //prendo il codice dalla richiesta
    const code = req.body.code;
    const userId = req.body.userId;

    if(!code){
        return res.status(401).json({message: "codice mancante"}) //Restitusico une errore di codice mancante se  il campo è vuoto
    }
    ToDoList.findOne({inviteCode: code})
        .then(todoListFind => {
            if(!todoListFind){return res.status(400).json({message: "Codice non valido"})}  //restituisco un errore se il codice non appartiene a nessuna to-dolist
            res.status(200).json({message: "ToDoList trovata", todoList: todoListFind}) //restitusico la todolist com il codice trovato se esiste
        })
        .catch(err => {
            res.status(500).json({message: "Errore interno del server"})  //restitusico errore se il problema dipende dal server
        })
}
