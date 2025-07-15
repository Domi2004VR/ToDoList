require('dotenv').config()
const express = require('express');
const app = express();
const http= require('http');
const {Server} = require('socket.io');
const mongoose = require('mongoose');
const cookieParser = require ('cookie-parser')
const cors = require ('cors')
const authRouter = require ('./routes/authRouter')
const toDoListRouter = require ('./routes/toDoListRouter')
const taskRouter = require ('./routes/taskRouter')


const server = http.createServer(app) //serve necessariamente per collegare un websocket
const io = new Server(server , {cors:{origin: process.env.FRONTEND_URL} }) ; //permette a react di connettersi al websocket


//io ascolta l'evento connection che viene emesso a ogni nuova connesssione
io.on('connection', (socket) => { //socket è la connessione con il singolo client collegato
    socket.on('CompletedTask', (data)=>{ //Ascolta evento CompletedTask che viene mandato dal client , data sono le info passate dal client
        //Scrivo qui cosa deve fare quando riceve l'evento CompletedTask
        socket.broadcast.emit('TaskNotify', data)  //BroadCast permette di inviare l'evento(TaskNotify) a tutti i connessi tranne a chi lo ha generato
    });
})


app.use(express.json()); //converte tutte le stringhe json in oggetti js
app.use(cookieParser()) //serve a rendere leggibili i cookie inviati dal client
app.use(cors({
    origin: process.env.FRONTEND_URL, //accetta richieste solo dall'url del mio frontend (per sicurezza)
    credentials: true, //permette anche di inviare cookie da quell'url senza che vengano bloccati
}))

app.use('/auth', authRouter);
app.use('/todolist', toDoListRouter);
app.use('/task', taskRouter);



mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
const db = mongoose.connection

db.once('open', () => {
    console.log('Connesso al database');
    server.listen(process.env.PORT, () => {
        console.log('Server e websocket in ascolto sulla porta: ' + process.env.PORT); // Metto il server e il Websocket in ascolto sulla porta 3000 (backend)
    })
})