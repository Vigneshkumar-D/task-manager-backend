# Task Manager Application

## Introduction

This project is a Task Manager application built using Node.js, Express.js, and PostgreSQL. It allows users to manage their tasks and provides authentication and authorization functionalities.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web application framework for Node.js.
- **PostgreSQL**: Relational database management system.
- **JSON Web Tokens (JWT)**: For secure user authentication.
- **bcrypt**: Library for hashing passwords.
- **dotenv**: For loading environment variables from a .env file.
- **pg**: PostgreSQL client for Node.js.
- **Jest**: JavaScript testing framework for unit and integration testing.
- **Supertest**: Library for testing HTTP requests/responses in Node.js applications.

## Features

- **Task Management**: Users can create, read, update, and delete tasks.
- **User Authentication**: Users can register, log in, and log out securely.
- **Authorization**: Access to certain routes is restricted based on user authentication.
- **Token-based Authentication**: JSON Web Tokens (JWT) are used for secure authentication.
- **User Management**: Users can register, update their profile, and delete their account.

## Project Structure

The project follows a modular structure:

- **src/models/**: Contains database models for tasks and users.
- **src/routes/**: Defines routes for task and user-related operations.
- **src/services/**: Contains business logic for task and user operations.
- **src/middleware/**: Middleware functions for route authentication.
- **src/config/**: Configuration files for database and authentication.
- **index.js**: Entry point of the application.
- **.env**: Environment variables file.
- **package.json**: Dependency configuration file.
- **README.md**: Project documentation file.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```
   PG_HOST=localhost
   PG_USER=postgres
   PG_PASSWORD=your_password
   PG_DATABASE=your_database
   PG_PORT=5432
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application:

   ```bash
   node index.js
   ```

## Usage

- Register a new user: `POST /users/register`
- Log in: `POST /users/login`
- Create a new task: `POST /tasks`
- Get all tasks: `GET /tasks`
- Get a task by ID: `GET /tasks/:id`
- Update a task by ID: `PUT /tasks/:id`
- Delete a task by ID: `DELETE /tasks/:id`

## Test Cases

### User Service Tests

#### Should register a new user

```javascript
it('should register a new user', async () => {
  const res = await request(app)
    .post('/users/register')
    .send({
      username: 'testuser',
      password: 'testpassword@123'
    });
  expect(res.statusCode).toEqual(201);
  expect(res.body).toHaveProperty('username');
  expect(res.body.username).toEqual('testuser');
});
```

#### Should login an existing user

```javascript
it('should login an existing user', async () => {
  const res = await request(app)
    .post('/users/login')
    .send({
      username: 'testuser',
      password: 'testpassword@123'
    });
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('token');
});
```

#### Should return an error for invalid credentials

```javascript
it('should return an error for invalid credentials', async () => {
  const res = await request(app)
    .post('/users/login')
    .send({
      username: 'invaliduser',
      password: 'invalidpassword'
    });
  expect(res.statusCode).toEqual(401);
  expect(res.body).toHaveProperty('message', 'Invalid Username or Password');
});
```

### Task Service Tests

#### Should create a new task

```javascript
it('should create a new task', async () => {
  const res = await request(app)
    .post('/tasks')
    .send({
      title: 'New Task',
      description: 'Description of the new task'
    });
  expect(res.statusCode).toEqual(201);
  expect(res.body).toHaveProperty('title', 'New Task');
});
```

#### Should delete a task by ID

```javascript
it('should delete a task by ID', async () => {
  const taskId = 10; // Replace with an existing task ID
  const res = await request(app).delete(`/tasks/${taskId}`);
  console.log("delete ", res.body); // Log the response body
  expect(res.statusCode).toEqual(204);
});
```
