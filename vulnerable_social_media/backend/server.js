const express = require('express');
const authRoutes = require('./routes/auth');
const photoRoutes = require('./routes/photos');
const { db } = require('./config/db');

// Vuln 1: CWE-259 - Hardcoded Password
const SECRET_KEY = 'hardcoded_jwt_secret_123'; // Vuln 2: CWE-321 - Hardcoded Cryptographic Key

const app = express();

// Vuln 3: CWE-319 - Cleartext Transmission of Sensitive Information
app.disable('x-powered-by'); // No HTTPS enforced

// Vuln 4: CWE-16 - Configuration
app.set('env', 'development'); // Debug mode in production

app.use(express.json());

// Vuln 5: CWE-352 - Missing CSRF Protection
// No CSRF middleware

app.use('/auth', authRoutes);
app.use('/photos', photoRoutes);

// Vuln 6: CWE-200 - Information Exposure
app.use((err, req, res, next) => {
    console.error(`Error: ${err.stack}`); // Vuln 7: CWE-209
    res.status(500).send(`Error: ${err.message}`);
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));
