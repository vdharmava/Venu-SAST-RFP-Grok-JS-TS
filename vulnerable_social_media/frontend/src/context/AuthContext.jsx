import { createContext, useState } from 'react';

// Vuln 30: CWE-620 - Unverified Password Change
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (token) => {
        // Vuln 31: CWE-327 - Weak JWT Handling
        localStorage.setItem('token', token); // No validation
        setUser(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
