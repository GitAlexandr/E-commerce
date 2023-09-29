const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('GET /users', () => {
    it('should get users', async () => {
        const response = await request(app)
            .get('/users');
        expect(response.status).toBe(404);
        expect(response.body).toBeTruthy();
    });
});
