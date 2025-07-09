const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const User = require ('../models/userModel');
const RefreshToken = require('../models/refreshTokenModel');


const createToken = (user) => {
    const accessToken = jwt.sign({
        id: user._id,
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
    const refreshToken = jwt.sign({
        id: user._id
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})

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
                                        secure: process.env.NODE_ENV === 'production', // Solo su HTTPS in produzione
                                        maxAge: 1000*60*60*24*7 // 7 giorni in millisecondi
                                    })
                                    res.json({              //risposta che mando al frontend contente info e accessToken
                                        message: 'Login effettuato con successo',
                                        accessToken: accessToken,
                                        id: createdUser._id,
                                        email: createdUser.email,
                                    })
                                })

                        })
                })
        })

}

exports.loginUser = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(401).json({message: 'Email e Password sono obbligatorie'})
    }

    User.findOne({ email: email })
    .then(userFind => {

        if (!userFind) {
           return res.status(401).json({ message: 'Utente non trovato' })
        }

        bcrypt.compare(password, userFind.password)
            .then(passwordFind => {
                if (!passwordFind) {
                    return res.status(401).json({ message: 'Password incorretta' })
                }

                const {accessToken, refreshToken} = createToken(userFind)

                RefreshToken.create({token: refreshToken, userId: userFind._id})

                .then(() => {
                    res.cookie('jwt', refreshToken, {
                        httpOnly: true,  //solo tramite http
                        sameSite: 'strict', // solo per richieste all'interno del sito (aiuta a prevenire CSRF)
                        secure: process.env.NODE_ENV === 'production', // Solo su HTTPS in produzione
                        maxAge: 1000*60*60*24*7 // 7 giorni in millisecondi
                    })

                    res.json({
                        message: 'Login effettuato con successo',
                        accessToken,
                        id: userFind._id,
                        email: userFind.email,
                    })
                })
            })

    })
        .catch(err => res.status(500).json({ message: 'Errore del server durante il Login' }))
}

exports.logoutUser = (req, res) => {

const cookies = req.cookies

    //equivale a scrivere if(!cookies || !cookies.jwt)
    if (!cookies?.jwt) {
        return res.status(204) //nessun cookie (e quindi refreshToken) da eliminare
    }

    const refreshToken = cookies.jwt

    RefreshToken.deleteOne({token: refreshToken})

        .then(() => {

            //pulisci il cookie
            res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
            })

            res.status(200).json({ message: 'Logout effettuato con successo' })


        })
        .catch(err => {
            return res.status(500).json({ message: 'Errore del server durante il logout' })
        })
}
exports.refreshToken = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Refresh token non trovato' })
    }

    const refreshToken = cookies.jwt

    RefreshToken.findOne({token: refreshToken})

    .then((refreshTokenFind) => {
        if (!refreshTokenFind) {
            return res.status(401).json({ message: 'Refresh token non valido' })
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err || refreshTokenFind.userId.toString() !== decoded.id) {
                return res.status(401).json({ message: 'Refresh token non valido o manomesso' })
            }

            const accessToken = jwt.sign({
                id: decoded.id,
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})

            res.status(200).json({ accessToken: accessToken})

        })

    })

        .catch(err => {
            return res.status(500).json({ message: 'Errore del server durante la verifica del refresh token' })
        })

}