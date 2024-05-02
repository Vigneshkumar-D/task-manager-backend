const request = require('supertest');
const app = require('../../index');


let server;

beforeAll(async () => {
  server = app.listen(5000); 
  await new Promise(resolve => server.on('listening', resolve));
});

afterAll(async () => {
  await server.close(); 
});


describe('User Service API', () => {
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

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        username: 'testuser',
        password: 'testpassword@123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.token).toHaveProperty('token');
    expect(res.body.token).toHaveProperty('user');
  });

  it('should return an error for invalid credentials', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword@123'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('Invalid username or password');
    expect(res.body).toEqual({ message: 'Invalid Username or Password' });
  });
});
