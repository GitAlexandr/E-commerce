const request = require('supertest');
const app = require('../index');
const Product = require("../models/Product");

beforeAll(async () => {
    jest.setTimeout(15000);
});
describe('GET /auth/users', () => {
    it("should get users for admin", async () => {
        const adminToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTViZTkxNzIyNjBhODQ0MjU3YWIyNSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTY5NjY3NDMwNSwiZXhwIjoxNjk2NzYwNzA1fQ.nIba1Eh4um5ktkJfA56Y8f3_99BJmGtwEbHDT6Im0es";

        const response = await request(app)
            .get('/auth/users')
            .set("Authorization", adminToken)

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it('should get users', async () => {
        const response = request(app)
            .get('/auth/users');
        expect(response.status).toBe(403);
        expect(response.body).toBeTruthy();
    });
});
