const request = require('supertest');
const app = require('../index');

describe('Author API', () => {
    let authorId;

    it('should create a new author', async () => {
      const res = await request(app)
        .post('/api/authors')
        .send({
          name: 'John Doe',
          bio: 'A fantastic author',
          birth_date: '1990-01-01'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty('id');

      authorId = res.body.data.id;
    });

    it('should retrieve all authors', async () => {
        const res = await request(app).get('/api/authors');
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeInstanceOf(Array);
    });

    it('should retrieve author by ID', async () => {
        const res = await request(app).get(`/api/authors/${authorId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('id', authorId);
    });

    it('should update an existing author', async () => {
        const res = await request(app)
            .put(`/api/authors/${authorId}`)
            .send({
            name: 'John Doe Updated',
            bio: 'An updated fantastic author',
            birth_date: '1990-01-01'
            });
        expect(res.statusCode).toEqual(200);
    });

    it('should delete an author', async () => {
        const res = await request(app).delete(`/api/authors/${authorId}`);
        expect(res.statusCode).toEqual(200);
    });
});