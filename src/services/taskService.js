const { Pool } = require('pg');
const {token} = require('./userService');
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

async function createTasksTable() {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title TEXT,
                description TEXT,
                status TEXT,
                assignee_id INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
    
        
        await pool.query(createTableQuery);
        console.log('Tasks table created successfully');
    } catch (error) {
        console.error('Error creating tasks table:', error);
    }
}
createTasksTable();

exports.createTask = async ({ title, description, status, assignee_id }) => {
    const query = 'INSERT INTO tasks (title, description, status, assignee_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [title, description, status, assignee_id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

exports.getAllTasks = async () => {
    const query = 'SELECT * FROM tasks';
    const result = await pool.query(query);
    return result.rows;
};

exports.getTaskById = async (taskId) => {
    const query = 'SELECT * FROM tasks WHERE id = $1';
    const values = [taskId];
    const result = await pool.query(query, values);
    return result.rows[0];
};

exports.updateTaskById = async (taskId, { title, description, status, assignee_id }) => {
    const query = 'UPDATE tasks SET ';
    const values = [];
    let setClause = '';
    let paramCount = 1;
    
    if (title !== undefined) {
        setClause += 'title = $' + paramCount++ + ', ';
        values.push(title);
    }
    if (description !== undefined) {
        setClause += 'description = $' + paramCount++ + ', ';
        values.push(description);
    }
    if (status !== undefined) {
        setClause += 'status = $' + paramCount++ + ', ';
        values.push(status);
    }
    if (assignee_id !== undefined) {
        setClause += 'assignee_id = $' + paramCount++ + ', ';
        values.push(assignee_id);
    }
    
    if (values.length === 0) {
        throw new Error('No valid fields provided for update.');
    }
    
    setClause = setClause.slice(0, -2);
    const fullQuery = query + setClause + ' WHERE id = $' + paramCount + ' RETURNING *';
    values.push(taskId);

    const result = await pool.query(fullQuery, values);
    return result.rows[0];
};


exports.deleteTaskById = async (taskId) => {
    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
    const values = [taskId];
    const result = await pool.query(query, values);
    return result.rows[0];
};
