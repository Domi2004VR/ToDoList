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

export function getTodo(listId) {
    return authFetch(`http://localhost:3001/todolist/mytodo/${listId}`, {
        method: 'GET'
    })
        .then(data => {
            return data.todoList;
        })
}


//funzione che fa la fetch per joinare una To-do e restituisce la todolist trovata se va a buon fine altrimenti un errore
export function joinTodo(code, userId) {
    return authFetch(`http://localhost:3001/todolist/join`, {
        method: 'PUT',     //Uso una PUT e non una get perchè devo aggiungere anche l'id utente ai membri e non solo recuperare la lista
        body: JSON.stringify({
            userId:userId,
            code: code
        })
    })
    .then(data => {

        return data.todoList;  //Una volta che ho trovato la todolist, restituisco la todolist con i membri aggiornati
    })
        .catch(err => {
            console.log("Il codice è errato");
        })
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

export function createTasks (description, listId) {
    return authFetch('http://localhost:3001/task/create', {
        method: 'PUT',
        body: JSON.stringify({
            description: description,
            todolistId: listId
        })
    })
        .then(data => {

            return data.tasks;
        })
}


export function deleteTask (taskId) {
    return authFetch(`http://localhost:3001/task/delete`, {
        method: 'DELETE',
        body: JSON.stringify({
            taskId: taskId
        })
    })
        .then(data => {
            return data.message;
        })
}

export function updateTask (taskId, description) {
    return authFetch(`http://localhost:3001/task/update`, {
        method: 'PUT',
        body: JSON.stringify({
            taskId: taskId,
            description: description
        })
    })
    .then(data => {
        return data;
    })

}