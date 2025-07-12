const jwt = require("jsonwebtoken");

exports.accessTokenVerify = (req, res, next) =>{
    //salvo nella variabile authHeader l'header inviato dalla richiesta chiamato authorization o Authorization (è key sensitive)
    const authHeader = req.headers.authorization || req.headers.authorization;

    console.log(authHeader);

    //se authHeader non esiste o non inizia con Bearer
    if(!authHeader?.startsWith('Bearer ')){
        console.log('mi fermo qui 1')
        return res.status(401).json({message: "access token mancante"})
    }
    //se invece è tutto corretto
    const token= authHeader.split(' ') [1] //serve per prendere solo il token escludendo la parola Bearer
    //verifico che l'access token sia valido
    console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){ //se non è valido perchè è scaduto o è stato manomesso ritorno un'errore
            console.log('mi fermo qui 2')
            return res.status(401).json({message: 'token non valido o scaduto'})
        }
        //altrimenti se è tutto corretto imposto come nuova proprietà dell'oggetto req la proprietà id, che corrisponde all'id del token appena ricevuto
        req.id = decoded.id; //serve per poter lavorare con l'id direttamente con i middleware successivi se ce n'è bisogno
                             //(se mi serve l'id nei prossimi middleware) posso utilizzare la proprietà id di req (req.id)
        console.log ('non mi fermo in authMiddleware')
        next(); //chiamo il prossimo middleware, perchè questo non finisce il ciclo richiesta/risposta

    })
}