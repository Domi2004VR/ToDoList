const ToDoList = require('../models/toDoListModel');
const Task = require('../models/taskModel');

exports.getToDoList = (req, res) => {
    const {todolistId} = req.params

    if (!todolistId){
        return res.status(400).json({message: "è necessario inserire l'id della todolist per ricevere tutte le info correlate"})
    }

    ToDoList.findOne({_id:todolistId})
        .then((listFind) =>{
            if (!listFind){
                return res.status(404).json({message: "non è stata trovata nessuna todolist con quell'id"})
            }

            res.status(200).json({
                message: "Lista trovata con successo",
                todoList: listFind})

        })

}

exports.createTask = (req, res) => {
    const {description, todolistId} = req.body;

    if(!todolistId){
        return res.status(400).json({message: "è richiesto l'id della todolist per poter inserire un nuovo task"})
    }
    if(!description){
        return res.status(400).json({message: "è richiesta una descrizione per poter creare una task"})
    }

    Task.create({
        description: description,
        toDoList: todolistId,
    })
        .then((taskCreated) =>{
            if(!taskCreated){
                return res.status(400).json({message: "non è stato possibile creare il task"})
            }

            res.status(201).json({
                message: "task creato con successo",
                task: taskCreated
            })

        })
        .catch((err) =>{
            console.log(err)
            return res.status(500).json({message: "Errore del server durante la creazione del task"})
        })
}