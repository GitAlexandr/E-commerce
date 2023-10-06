const request = require('supertest')
const app = require('../index')
// beforeAll(async () => {
//     jest.setTimeout(10000);
// });
describe('GET /orders', () => {
    it('should get orders', async () => {
        const adminToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTViZTkxNzIyNjBhODQ0MjU3YWIyNSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTY5NjUzNDg4NywiZXhwIjoxNjk2NjIxMjg3fQ.X8TEprS-132SDKEOi-ktOLIFVHKARSQmE8n1peiAWw4';

        const response = await request(app)
            .get('/orders')
            .set("Authorization", adminToken)

       expect(response.status).toBe(200);
       expect(response.body).toBeTruthy();
    });
})