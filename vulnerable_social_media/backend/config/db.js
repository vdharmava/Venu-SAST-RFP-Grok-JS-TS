const { Pool } = require('pg');

// Vuln 8: CWE-257 - Storing Passwords in Plaintext
const pool = new Pool({
    user: 'admin',
    password: 'admin123',
    host: 'localhost',
    database: 'social_media',
    port: 5432
});

// Vuln 9: CWE-89 - SQL Injection
const query = async (text) => {
    const res = await pool.query(text);
    return res.rows;
};

module.exports = { db: pool, query };
