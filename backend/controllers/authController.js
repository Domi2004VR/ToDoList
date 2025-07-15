const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const User = require ('../models/userModel');
const RefreshToken = require('../models/refreshTokenModel');

//funzione per creare accessToken e RefreshToken
const createToken = (user) => {
    const accessToken = jwt.sign({
        id: user._id, //informazione payload
    }, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '15m'}) //data di scadenza dell'accessToken
    const refreshToken = jwt.sign({
        id: user._id //informazione payload
    }, `${process.env.REFRESH_TOKEN_SECRET}`, {expiresIn: '7d'}) //data di scadenza del refreshToken

    return {accessToken, refreshToken}
}
exports.registerUser = (req, res) => {
    const { nome, cognome, email, password, password2 } = req.body

    if (!nome || !cognome || !email || !password || !password2) {
        return res.status(401).json({message: 'Tutti i campi sono obbligatori'})
    }
    if (password !== password2) {
        return res.status(401).json({message: 'Le password non corrispondono'})
    }
    if (password.length < 8) {
        return res.status(401).json({message: 'La password deve essere di almeno 8 caratteri'})
    }

    User.findOne({email:email})   //controlla se l'utente è registrato o meno
        .then(userFind => {
            if(userFind){return res.status(400).json({message: "l'utente è gia registrato, effettua il login!"})}
            bcrypt.hash(password, 10)    //funzione che crea la password hashata
                .then((hashedPassword) => {
                    User.create({     //creo un nuovo documento nel database con il nuovo utente
                        nome: nome,
                        cognome: cognome,
                        email: email,
                        password: hashedPassword    //passo la pw hashata
                    })
                        .then((createdUser)=>{   //Se la registrazione va a buon fine creo un refresh token e access token restituendolo al frontend per memorizzarlo
                            const {accessToken, refreshToken} = createToken(createdUser)
                            RefreshToken.create({token: refreshToken, userId: createdUser._id})     //salvo il refresh token nel DB
                                .then(() => {           //Creo il cookie da spedire
                                    res.cookie('jwt', refreshToken, {
                                        httpOnly: true,  //solo tramite http
                                        sameSite: 'strict', // solo per richieste all'interno del sito (aiuta a prevenire CSRF)
                                        secure: true, // Solo su HTTPS in produzione
                                        maxAge: 1000*60*60*24*7 // 7 giorni in millisecondi
                                    })
                                    res.json({              //risposta che mando al frontend contente info e accessToken
                                        message: 'Login effettuato con successo',
                                        accessToken: accessToken,
                                        id: createdUser._id,
                                        email: createdUser.email,
                                        nome: createdUser.nome,
                                        cognome: createdUser.cognome,
                                    })
                                })

                        })
                })
        })

}

exports.loginUser = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) { //se password e email non esistono (se non sono udefined, stringhe vuote o null)
        return res.status(401).json({message: 'Email e Password sono obbligatorie'})
    }

    User.findOne({ email: email }) //ricerco nella collection User tra gli utenti registrati se esiste già un utente con quella email registrata
    .then(userFind => {

        if (!userFind) { //se non trova nulla allora dice utente non trovato
           return res.status(401).json({ message: 'Utente non trovato' })
        }

        bcrypt.compare(password, userFind.password) //altrimenti se lo trova fa un confronto tra la password inviata tramite body della richiesta e quella che abbiamo nel db
            .then(passwordFind => {
                if (!passwordFind) { //se le password non coincidono
                    return res.status(401).json({ message: 'Password incorretta' })
                }

                const {accessToken, refreshToken} = createToken(userFind) //se coincidono le password, allora creo i token

                RefreshToken.create({token: refreshToken, userId: userFind._id})  // registro il refreshToken nel db

                .then(() => {
                    res.cookie('jwt', refreshToken, { //poi lo invio tramite cookie il refreshToken
                        httpOnly: true,  //solo tramite http
                        sameSite: 'strict', // solo per richieste all'interno del sito (aiuta a prevenire CSRF)
                        secure: true, // Solo su HTTPS in produzione
                        maxAge: 1000*60*60*24*7 // 7 giorni in millisecondi
                    })

                    res.json({ //ed invio tramite body della risposta l'accessToken, che verrà poi conservato nel localStorage
                        message: 'Login effettuato con successo',
                        accessToken: accessToken,
                        id: userFind._id,
                        email: userFind.email,
                        nome: userFind.nome,
                        cognome: userFind.cognome,
                    })
                })
            })

    })
        .catch(err => res.status(500).json({ message: 'Errore del server durante il Login' }))
}

exports.logoutUser = (req, res) => {

const cookies = req.cookies

    //equivale a scrivere if(!cookies || !cookies.jwt) , cioè se cookies o cookies.jwt non esistono
    if (!cookies?.jwt) {
        return res.status(204) //nessun cookie (e quindi refreshToken) da eliminare
    }

    const refreshToken = cookies.jwt

    RefreshToken.deleteOne({token: refreshToken}) //elimina l'unico refreshToken nel db che ha corrispondenza con quello del cookie inviato

        .then(() => {

            //pulisci il cookie
            res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
            })

            res.status(200).json({ message: 'Logout effettuato con successo' })
        })
        .catch(err => {
            return res.status(500).json({ message: 'Errore del server durante il logout' })
        })
}

//funzione che controlla la validità del refreshToken, e se valido restituisce un nuovo accessToken
exports.refreshToken = (req, res) => {
    //equivale a scrivere if(!cookies || !cookies.jwt) , cioè se cookies o cookies.jwt non esistono
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Refresh token non trovato' })
    }

    const refreshToken = cookies.jwt

    RefreshToken.findOne({token: refreshToken}) //se esiste il cookie chiamato jwt allora faccio una ricerca all'interno del db, nella collezione di RefreshToken e se non lo trova allora è vecchio o modificato

    .then((refreshTokenFind) => {
        if (!refreshTokenFind) { //se non trova nessun refreshToken corrispondente (vecchio o manomesso)
            return res.status(401).json({ message: 'Refresh token non valido' })
        }

        jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`, (err, decoded) => { //se invece lo trova, allora faccio una verifica del refreshToken
            if(err || refreshTokenFind.userId.toString() !== decoded.id) { //se questa verifica restituisce un errore o semplicemente id dell'utente presente nel db non coincide con quello salvato nel db allora restituisco un errore
                return res.status(401).json({ message: 'Refresh token non valido o manomesso' })
            }
            //se è tutto valido creo un nuovo accessToken
            const accessToken = jwt.sign({
                id: decoded.id,
            }, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '15m'})
            // gli invio il nuovo accessToken creato
            res.status(200).json({ accessToken: accessToken})

        })

    })

        .catch(error => {
            console.error(error)
            return res.status(500).json({ message: 'Errore del server durante la verifica del refresh token' })
        })

}