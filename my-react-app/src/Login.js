import { useState } from "react";

export default function Login({ onLoginSuccess }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    async function Validate() {
        const user = { userName, password };
        const url = process.env.REACT_APP_LOGIN_API_URL ||
            (process.env.NODE_ENV === 'development'
                ? "https://localhost:60013/Login/Login"
                : "");

        if (!url) {
            console.error('REACT_APP_LOGIN_API_URL is not configured.');
            alert('Login service is not configured.');
            return;
        }

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (res.status === 200) {
                alert("Login Success");
                if (onLoginSuccess) {
                    onLoginSuccess();
                }
            } else {
                alert("Login Failed");
            }
        } catch (err) {
            console.log("Error in login api call", err);
            alert("Login Failed");
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            boxSizing: 'border-box',
            backgroundImage: `url("${process.env.PUBLIC_URL}/header.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '380px',
                padding: '32px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                boxSizing: 'border-box',
            }}>
                <h1 style={{ marginTop: 0 }}>Login</h1>
                <div>
                    <label htmlFor="username">UserName:</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter UserName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        style={{ width: '100%', margin: '8px 0 16px', padding: '10px', boxSizing: 'border-box' }}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', margin: '8px 0', padding: '10px', boxSizing: 'border-box' }}
                    />
                </div>
                <br />
                <button onClick={Validate}>Submit</button>
            </div>
        </div>
    );
}