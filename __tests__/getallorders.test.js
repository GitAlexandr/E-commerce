const request = require('supertest')
const app = require('../index')
// beforeAll(async () => {
//     jest.setTimeout(10000);
// });
describe('GET /orders', () => {
    it('should get orders', async () => {
        const adminToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTViZTkxNzIyNjBhODQ0MjU3YWIyNSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTY5NjU4MzM0NywiZXhwIjoxNjk2NjY5NzQ3fQ.yxdHyX40ZThsNEZJTNakhM6pAVCC0TI1KwZgrH0jmgE';

        const response = await request(app)
            .get('/orders')
            .set("Authorization", adminToken)

       expect(response.status).toBe(200);
       expect(response.body).toBeTruthy();
    });
})