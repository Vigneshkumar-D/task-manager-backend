const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const createTaskTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(100),
            assignee_id INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    await pool.query(query);
};

module.exports = { createTaskTable };
