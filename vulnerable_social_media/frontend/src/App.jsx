import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import PhotoFeed from './components/PhotoFeed';
import UploadPhoto from './components/UploadPhoto';

// Vuln 29: CWE-352 - Missing CSRF Token
function App() {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h1>Vulnerable Social Media</h1>
            {!user ? (
                <>
                    <Login />
                    <Register />
                </>
            ) : (
                <>
                    <UploadPhoto />
                    <PhotoFeed />
                </>
            )}
        </div>
    );
}

export default App;