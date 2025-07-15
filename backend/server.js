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


const server = http.createServer(app);
const io = new Server(server , {cors:{origin: '*'} }) ; //permetti a react di connettersi


//Scrivo appena un utente di connette
io.on('connection', (socket) => {
    console.log('Utente connesso');


    socket.on('CompletedTask', (data)=>{
         console.log("Task completata:  " , data);

        socket.broadcast.emit('TaskNotify', data)  //BroadCast permette di inviare l'evento a tutti i connessi tranne a chi lo ha generato
    });
})

server.listen(3002 ,()=>{ //Metto il server Websocket in ascolto sulla porta 3002
    console.log('Server WebSocket in ascolto sulla porta: 3002');
})




app.use(express.json()); //converte tutte le stringhe json in oggetti js
app.use(cookieParser()) //serve a rendere leggibili i cookie inviati dal client
app.use(cors({
    origin: 'http://localhost:3000', //accetta richieste solo dall'url del mio frontend (per sicurezza)
    credentials: true, //permette anche di inviare cookie da quell'url senza che vengano bloccati
}))

app.use('/auth', authRouter);
app.use('/todolist', toDoListRouter);
app.use('/task', taskRouter);



mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
const db = mongoose.connection

db.once('open', () => {
    console.log('Connesso al database');
    app.listen(process.env.PORT, () => {
        console.log('Server in ascolto sulla porta: ' + process.env.PORT);
    })
})