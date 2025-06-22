const redis = require('redis');

// Vuln 10: CWE-798 - Hardcoded Credentials
const client = redis.createClient({
    url: 'redis://default:redis_pass_123@localhost:6379'
});

// Vuln 11: CWE-330 - Use of Insufficiently Random Values
client.on('error', (err) => console.log(`Redis Error: ${err}`));

module.exports = client;