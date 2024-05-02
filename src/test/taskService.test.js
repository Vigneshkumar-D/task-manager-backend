const request = require('supertest');
const app = require('../../index');


let server;

beforeAll(async () => {
  server = app.listen(4000); 
  await new Promise(resolve => server.on('listening', resolve));
});

afterAll(async () => {
  await server.close(); 
});


describe('Task Service API', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Task 1',
        description: 'Description for Task 1',
        status: 'pending',
        assignee_id: 18
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toEqual('Task 1');
  });

  it('should get all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a task by ID', async () => {
    const taskId = 10;
    const res = await request(app).get(`/tasks/${taskId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(taskId);
  });

  it('should update a task by ID', async () => {
    const taskId = 10;
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .send({
        title: 'Updated Task 1',
        description: 'Updated description for Task 1',
        status: 'completed'
      });;
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Updated Task 1');
  });

  it('should delete a task by ID', async () => {
    const taskId = 10;
    const res = await request(app).delete(`/tasks/${taskId}`);
    expect(res.statusCode).toEqual(204);
  });
});
