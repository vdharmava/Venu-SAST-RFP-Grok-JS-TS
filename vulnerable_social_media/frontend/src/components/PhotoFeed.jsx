import { useEffect, useState } from 'react';

// Vuln 38: CWE-79 - Cross-Site Scripting (XSS)
function PhotoFeed() {
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        const fetchPhotos = async () => {
            // Vuln 39: CWE-918 - SSRF
            const user = new URLSearchParams(window.location.search).get('user');
            const res = await fetch(`http://localhost:3000/photos/feed?user=${user}`);
            const data = await res.json();
            setPhotos(data);
        };
        fetchPhotos();
    }, []);

    return (
        <div>
            <h2>Photo Feed</h2>
            {photos.map((photo) => (
                <div key={photo.id}>
                    {/* Vuln 40: CWE-79 - XSS */}
                    <img src={photo.photo} alt={photo.caption} />
                    <p dangerouslySetInnerHTML={{ __html: photo.caption }} />
                </div>
            ))}
        </div>
    );
}

export default PhotoFeed;