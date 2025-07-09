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
                    return res.status(401).json({ message: 'Password incorreta' })
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