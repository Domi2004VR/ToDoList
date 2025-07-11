

//funzione che fa la fetch per creare una
// Todo e restituisce la to do creata se va a buon fine altrimenti un errore
export function createTodo(title) {
    return fetch('http://localhost:3001/todolist/create', {
        method: "POST",
        headers: {
            contentType: 'application/json'
        },
        body: JSON.stringify({title: title})
    })
        .then(res => {
            if (!res.ok) throw new Error("Errore nella creazione");
            return res.json(); // restituisce la nuova todo
        });
}

//funzione che fa la fetch per joinare una To-do e restituisce la todolist trovata se va a buon fine altrimenti un errore
export function joinTodo(code) {
    return fetch('http://localhost:3001/todolist/join', {   //Invia al backend il codice di invito della To-do da joinare
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({code: code})
    })
            .then(res => {
                if (!res.ok) throw new Error("Errore nella creazione");
                return res.json(); // restituisce la todolist trovata
            });
}

//funzione che fa la fetch per fare il logout
export function logout() {
    return fetch('http://localhost:3001/auth/logout', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
            .then(res => {
                if (!res.ok) throw new Error("Errore nel logout");
            })
}