import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Vuln 41: CWE-352 - Missing CSRF Token
function UploadPhoto() {
    const { user } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const photo = e.target.photo.value;
        const caption = e.target.caption.value;
        // Vuln 42: CWE-319 - Cleartext Transmission
        await fetch('http://localhost:3000/photos/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'User': user },
            body: JSON.stringify({ photo, caption })
        });
    };

    return (
        <div>
            <h2>Upload Photo</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="photo" placeholder="Photo URL" />
                <input type="text" name="caption" placeholder="Caption" />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default UploadPhoto;