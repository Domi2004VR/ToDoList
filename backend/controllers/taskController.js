const ToDoList = require('../models/toDoListModel');
const Task = require('../models/taskModel');

exports.getToDoList = (req, res) => {
    const {todolistId} = req.params

    if (!todolistId){
        return res.status(400).json({message: "è necessario inserire l'id della todolist per ricevere tutte le info correlate"})
    }

    ToDoList.findOne({_id:todolistId}).populate('tasks')
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
    console.log("ti sto mandando l'id di todolist: " + todolistId);
    console.log("ti sto mandando description: " + description);

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

            return ToDoList.findByIdAndUpdate(todolistId, {
                //prendo l'id della lista, aggiungo il task appena creato con successo in maniera univoca (non iserisce duplicati al contrario di $push)
                $addToSet: {tasks: taskCreated},
            }, {new: true}).populate('tasks')

                .then((ToDoListUpdated) =>{
                    console.log(ToDoListUpdated.tasks)
                    res.status(200).json({
                        message: "task creato con successo",
                        tasks: ToDoListUpdated.tasks,
                    })
                })

        })
        .catch((err) =>{
            console.log(err)
            return res.status(500).json({message: "Errore del server durante la creazione del task"})
        })
}

exports.deleteTask = (req, res) => {
    const {taskId} = req.body

    if(!taskId){
        return res.status(400).json({message: "è richiesto l'id della task per procedere con l'eliminazione"})
    }

    Task.deleteOne({_id:taskId})
    .then((taskDeleted) =>{
        if(!taskDeleted){
            return res.status(400).json({message: "errore durante l'eliminazione del task"})
        }
        res.status(200).json({message: "task eliminato con successo"})
    })
        .catch((err) =>{
            console.log(err)
            return res.status(500).json({message: "Errore del server durante l'eliminazione del task"})
        })

}


exports.updateTask = (req, res) => {
    const {taskId, description} = req.body
    console.log("ti sto mandando la description: " + description);

    if(!taskId){
        return res.status(400).json({message: "è richiesto l'id della task per procedere con la modifica"})
    }

    if(!description){
        return res.status(400).json({message: "è richiesto una descrizione per procedere con la modifica"})
    }

    Task.updateOne({_id:taskId}, {
        $set: {description: description},
    })
        .then((taskUpdated) =>{
            if(!taskUpdated){
                return res.status(400).json({message: "errore durante la modifica del task"})
            }

            res.status(200).json({
                message: "task modificato con successo",
                taskUpdated: taskUpdated
            })

        })
        .catch((err) =>{
            console.log(err)
            return res.status(500).json({message: "Errore del server durante la modifica del task"})
        })
}


exports.isDoneTask = (req, res) => {
   const  {taskId, isDone } = req.body
    console.log("ti sto mandando l'id della task: " + taskId);
    console.log("ti sto mandando il valore della task: " + isDone);
    console.log("valuto la condizione " + (isDone === null))
    if(!taskId){
        return res.status(400).json({message: "Per cambiare lo stato di una task è necessario inserire l'id della task"})
    }
    if(isDone === null){
        return res.status(400).json({message: "Per cambiare lo stato di una task hai bisogno del suo stato attuale"})
    }

    Task.updateOne({_id:taskId}, {
        $set: {isDone: isDone},
    })
        .then((taskStatus)=>{
            if(!taskStatus){
                return res.status(400).json({message: "errore durante la modifica del task"})
            }
            return res.status(200).json({message: "task modificato con successo" , taskStatus: taskStatus})
            }
        )
}