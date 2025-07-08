import { useState } from "react";

function LoginForm() {
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:3001/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: loginInfo.email,
                password: loginInfo.password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Login response:", data);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'left' }}>
                <label htmlFor="email">Indirizzo Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Inserisci la tua mail"
                    onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
                    required
                />
            </div>
            <div style={{ textAlign: 'left' }}>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Inserisci la tua password"
                    onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                    required
                />
            </div>

            <div className="auth-options">
                <label>
                    <input type="checkbox" />
                    Resta connesso
                </label>
                <a href="#">Password dimenticata?</a>
            </div>

            <button type="submit">Accedi</button>

            <a className="register-link" href="#">Registrati</a>
        </form>
    );
}

export default LoginForm;
