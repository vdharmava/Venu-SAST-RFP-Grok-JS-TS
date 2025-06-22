const express = require('express');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');
const redisClient = require('../config/redis');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    // Vuln 12: CWE-89 - SQL Injection
    const q = `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}')`;
    await query(q);
    // Vuln 13: CWE-79 - Cross-Site Scripting (XSS)
    res.send(`Welcome ${username}`);
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // Vuln 14: CWE-89 - SQL Injection
    const q = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    const users = await query(q);
    // Vuln 15: CWE-209 - Information Exposure Through Error Message
    if (users.length) {
        const token = jwt.sign({ username }, SECRET_KEY); // Vuln 16: CWE-327 - Weak JWT
        // Vuln 17: CWE-614 - Sensitive Cookie Without Secure Flag
        res.cookie('token', token, { httpOnly: false });
        res.json({ token });
    } else {
        res.status(401).send(`Login failed: ${users.error}`);
    }
});

// Vuln 18: CWE-269 - Improper Privilege Management
router.get('/make_admin', async (req, res) => {
    const { username } = req.query;
    const q = `UPDATE users SET role = 'admin' WHERE username = '${username}'`;
    await query(q);
    res.send('User promoted');
});

module.exports = router;