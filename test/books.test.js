const request = require('supertest');
const app = require('../index');

describe('Books API', () => {
  let bookId;

  it('should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({
        title: 'The Great Book',
        description: 'A great book about greatness.',
        publish_date: '2021-01-01',
        author_id: 1
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('id');

    bookId = res.body.data.id;
  });

  it('should retrieve all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('should retrieve book by ID', async () => {
    const res = await request(app).get(`/api/books/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('id', bookId);
  });

  it('should update an existing book', async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .send({
        title: 'The Great Book Updated',
        description: 'An updated great book about greatness.',
        publish_date: '2021-01-01',
        author_id: 1
      });
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a book', async () => {
    const res = await request(app).delete(`/api/books/${bookId}`);
    expect(res.statusCode).toEqual(200);
  });
});