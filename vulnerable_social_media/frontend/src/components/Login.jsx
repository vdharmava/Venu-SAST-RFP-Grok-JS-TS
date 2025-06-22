import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Vuln 32: CWE-79 - Cross-Site Scripting (XSS)
function Login() {
    const { login } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        // Vuln 33: CWE-319 - Cleartext Transmission
        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        login(data.token);
        // Vuln 34: CWE-200 - Information Exposure
        console.log(`Login token: ${data.token}`);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
