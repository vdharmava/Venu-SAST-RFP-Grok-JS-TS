const express = require('express');
const { query } = require('../config/db');
const redisClient = require('../config/redis');
const xml2js = require('xml2js');
const router = express.Router();

// Vuln 19: CWE-306 - Missing Authentication for Critical Function
router.post('/upload', async (req, res) => {
    const { photo, caption } = req.body;
    const user = req.headers['user']; // No validation
    // Vuln 20: CWE-89 - SQL Injection
    const q = `INSERT INTO photos (user, photo, caption) VALUES ('${user}', '${photo}', '${caption}')`;
    await query(q);
    // Vuln 21: CWE-637 - Unnecessary Information Exposure
    await redisClient.set(`photo:${user}`, caption);
    res.send(`Photo uploaded: ${caption}`);
});

router.get('/feed', async (req, res) => {
    // Vuln 22: CWE-89 - SQL Injection
    const user = req.query.user;
    const q = `SELECT * FROM photos WHERE user = '${user}'`;
    const photos = await query(q);
    // Vuln 23: CWE-200 - Information Exposure
    res.json(photos);
});

// Vuln 24: CWE-611 - XML External Entity (XXE)
router.post('/parse_xml', async (req, res) => {
    const parser = new xml2js.Parser({ explicitArray: false });
    parser.parseString(req.body.xml, (err, result) => {
        res.json(result); // No XXE protection
    });
});

// Vuln 25: CWE-918 - Server-Side Request Forgery (SSRF)
router.get('/fetch', async (req, res) => {
    const url = req.query.url;
    const response = await fetch(url); // No URL validation
    const data = await response.text();
    res.send(data);
});

module.exports = router;