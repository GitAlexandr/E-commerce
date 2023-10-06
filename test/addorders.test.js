const request = require('supertest');
const app = require('../index');
const Order = require('../models/Order');

const testOrder = {
    userId: '651ec86d6eb98369f24a8979',
    products: [
        {
            productId: '111test',
            quantity: 3,
        },
        {
            productId: '222test',
            quantity: 3,
        },
    ],
    amount: 15,
    address: 'TESTHOME',
};

beforeAll(async () => {
    jest.setTimeout(15000);

    const order = new Order(testOrder);
    await order.save();
});

describe('POST /orders', () => {
    it('should return 201 for valid order', async () => {
        const adminToken =
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTViZTkxNzIyNjBhODQ0MjU3YWIyNSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTY5NjUzNDg4NywiZXhwIjoxNjk2NjIxMjg3fQ.X8TEprS-132SDKEOi-ktOLIFVHKARSQmE8n1peiAWw4';

        const response = await request(app)
            .post('/orders')
            .set('Authorization', adminToken)
            .send(testOrder);

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
    });

    afterAll(async () => {
        // Clear the database after running tests
        await Order.deleteMany({ userId: testOrder.userId });
    });
});
