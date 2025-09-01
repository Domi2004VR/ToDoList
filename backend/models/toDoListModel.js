const mongoose = require('mongoose')

const toDoListSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,  // serve per impostare la data di creazione della To-Do List al momento della creazione
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default:[],
    }],
    inviteCode:{
        type: String,
        required: true,
        unique: true,
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default:[],
    }]

})

const ToDoList = mongoose.model('ToDoList', toDoListSchema);

module.exports = ToDoList;