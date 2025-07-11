require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require ('cookie-parser')
const cors = require ('cors')
const authRouter = require ('./routes/authRouter')
const toDoListRouter = require ('./routes/toDoListRouter')


app.use(express.json()); //converte tutte le stringhe json in oggetti js
app.use(cookieParser()) //serve a rendere leggibili i cookie inviati dal client
app.use(cors({
    origin: 'http://localhost:3000', //accetta richieste solo dall'url del mio frontend (per sicurezza)
    credentials: true, //permette anche di inviare cookie da quell'url senza che vengano bloccati
}))

app.use('/auth', authRouter);
app.use('/todolist', toDoListRouter);



mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
const db = mongoose.connection

db.once('open', () => {
    console.log('Connesso al database');
    app.listen(process.env.PORT, () => {
        console.log('Server in ascolto sulla porta: ' + process.env.PORT);
    })
})