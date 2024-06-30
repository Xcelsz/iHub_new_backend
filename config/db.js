const mysql = require('mysql2/promise');

async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host: "sql10.freesqldatabase.com",
        user: "sql10717088",
        password: "cJcwVNP2K6",
        database: "sql10717088",
    });
    return connection;
}

module.exports = initializeDatabase;
