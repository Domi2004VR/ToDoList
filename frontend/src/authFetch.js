function authFetch(url, options = {}) {
    const accessToken = localStorage.getItem('jwt');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    const fetchOptions = {
        ...options,
        headers,
        credentials: 'include',
    };

    return fetch(url, fetchOptions)
        .then(res => {
            if (res.status === 401) {
                // Access token scaduto quindi tenta il refresh del token
                return fetch("http://localhost:3001/auth/refresh", {
                    method: "POST",
                    credentials: "include", // se usi cookie httpOnly
                })
                    .then(refreshRes => {
                        if (!refreshRes.ok) {
                            return refreshRes.json().then(err => {
                                console.log("ho preso la strada sbagliata");
                                localStorage.removeItem("jwt");
                                throw new Error(err.message || "Sessione scaduta");
                            });
                        }

                        return refreshRes.json()
                            .then(data => {
                                localStorage.setItem("jwt", data.accessToken);
                                headers.Authorization = `Bearer ${data.accessToken}`;

                                // Riprovo la richiesta originale
                                return fetch(url, { ...options, headers })
                                    .then(secondRes => {
                                        if (!secondRes.ok) {
                                            throw new Error("Errore anche dopo il refresh");
                                        }
                                        return secondRes.json();
                                    });
                            });
                    });
            }

            if (!res.ok) {
                return res.json().then(err => {
                    throw new Error(err.message || "Errore nella richiesta");
                });
            }

            return res.json();
        });
}

export default authFetch