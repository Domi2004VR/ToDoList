const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    creationDate: {
      type: Date,
      default: Date.now
    },
    Todolist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ToDoList',
        required: true,
    },
    lastChanger:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    history:[{          //lascio la storia del task embedded perchè voglio limitarla alle ultime 3 azioni non serve fare un nuova modello
        user:{type: mongoose.Schema.Types.ObjectId},
        date: Date,
        action: String,
    }]
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;