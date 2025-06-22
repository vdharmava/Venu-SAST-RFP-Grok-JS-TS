import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Vuln 35: CWE-79 - Cross-Site Scripting (XSS)
function Register() {
    const { login } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const email = e.target.email.value;
        // Vuln 36: CWE-319 - Cleartext Transmission
        const res = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        });
        const data = await res.text();
        // Vuln 37: CWE-79 - XSS
        document.body.innerHTML += data;
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <input type="email" name="email" placeholder="Email" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;