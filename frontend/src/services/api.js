import authFetch from '../authFetch';


//funzione che fa la fetch per creare una
// To do e restituisce la to do creata se va a buon fine altrimenti un errore

export function createTodo(title, userId ) {
    return authFetch('http://localhost:3001/todolist/create', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            userId: userId
        })
    })
        .then(data => {
            console.log("ti sto rispondendo con questi dati: " + JSON.stringify(data.todoList, null, 2));
            return data.todoList

        })
        .catch(err => {
            console.log(err);
        })
}

export function deleteTodo(userId, todolistId) {
    return authFetch('http://localhost:3001/todolist/delete', {
        method: 'DELETE',
        body: JSON.stringify({
            userId: userId,
            todolistId: todolistId
        })
    })
        .then(data => {
           return console.log(data.message);
        })
}

export function openList(listId) {
    return authFetch(`http://localhost:3001/todolist/open/${listId}`, {
        method: 'GET',

    })
    .then(data => {
        return data.todoList;
    })
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