const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/dbConfig');

async function createUsersTable() {
    try {
        const usersQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
`;
await pool.query(usersQuery);
        console.log('Users table created successfully');
    } catch (error) {
        console.error('Error creating tasks table:', error);
    }
}

createUsersTable();

exports.registerUser = async (userData) => {
    const { username, password } = userData;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const values = [username, hashedPassword];
    const result = await pool.query(query, values);
    return { username };
};

exports.loginUser = async ({username, password}) => {
    try {
       
        let token;

        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await pool.query(query, [username]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid username or password');
        }

        const payload = { username: user.username };
        token = await jwt.sign(payload, "MY_SECRET_KEY", { expiresIn: '1h' });
        return { user, token }; 
    } catch (error) {
        throw error;
    }
};
