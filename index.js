require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./src/routes/taskRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/tasks', taskRoutes);

app.use('/users', userRoutes);

app.listen(3001, () => {
    console.log(`Server is running on http://localhost:${3001}`);
});
module.exports = app;