const mysql = require('mysql2/promise');

async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "kingsharp",
        database: "xcelzs2018_ihubx",
    });
    return connection;
}

module.exports = initializeDatabase;