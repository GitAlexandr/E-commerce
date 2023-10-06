const request = require('supertest');
const app = require('../index');
const Product = require('../models/Product');

describe('GET /products', () => {
    it('should get products', async () => {
        const response = await request(app).get('/products');

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});