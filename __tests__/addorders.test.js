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
    // jest.setTimeout(40000);
    

    const order = new Order({
        userId: testOrder.userId,
        products: [
            {
                productId: testOrder.productId, 
                quantity: testOrder.quantity,
            },
            {
                productId: testOrder.productId, 
                quantity: testOrder.quantity,
            },
        ],
        amount: testOrder.amount, 
        address: testOrder.address, 
    });
    await order.save();
});

describe('POST /orders', () => {

    beforeEach(async () => {
        await Order.deleteMany({ userId: testOrder.userId });
    });

    it('should return 500 for valid order', async () => {
        const adminToken =
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTViZTkxNzIyNjBhODQ0MjU3YWIyNSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTY5NjY3NDMwNSwiZXhwIjoxNjk2NzYwNzA1fQ.nIba1Eh4um5ktkJfA56Y8f3_99BJmGtwEbHDT6Im0es';

        const response = await request(app)
            .post('/orders')
            .set('Authorization', adminToken)
            .send(testOrder);

        expect(response.status).toBe(500);
        expect(response.body.status).toBe(false);
    });

    afterAll(async () => {
        // Clear the database after running tests
        await Order.deleteMany({ userId: testOrder.userId });
    });
});

// afterAll(async () => {
//     // Clear the database after running tests
//     await Order.deleteMany({ userId: testOrder.userId });
// });
