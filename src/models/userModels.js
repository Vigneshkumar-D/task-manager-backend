const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `;
    await pool.query(query);
};

module.exports = { createUserTable };
