const ToDoList = require('../models/toDoListModel');
exports.createToDoList = (req,res,next) => {
    //Creo una funzione per generare codici di invito casuali
    const generateInviteCode = () => {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }
    //salvo nella variabile title il titolo passatomi dal body della request
    const title = req.body.title;
    const userId = req.body.userId;
    //Se il title è vuoto ritorno un errore 401
    if(!title){
        return res.status(401).json({message: "title mancante"})
    }
    ToDoList.findOne({title:title})
        .then(todoListFind => {   //Questo controlla fra tutte le liste non solo quelle relative all'utente che sta effettuando la richiesta ma anche quelle relative ad altri utenti'
            if(todoListFind){return res.status(400).json({message:"Questo titolo è già stato utilizzato "})}
        })
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
    .catch(err => {
            res.status(500).json({message: "Errore interno del server"})  //Qualcosa nella creazione della lista non va a buon fine
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
