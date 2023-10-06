const request = require('supertest');
const app = require('../index');
const Product = require('../models/Product');


const testProduct = {
    title: 'testproduct',
    description: 'testdescription',
    price: 1111,
};

beforeAll(async () => {
    jest.setTimeout(15000);

    await Product.deleteMany({ title: testProduct.title });

    const product = new Product({
        title: testProduct.title,
        description: testProduct.description,
        price: testProduct.price,
    });
    await product.save();
});

describe('POST /product-add', () => {
    beforeEach(async () => {
        await Product.deleteMany({ title: testProduct.title });
    });

    it('should return 201 for duplicate product', async () => {
        const response = await request(app)
            .post('/product-add')
            .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTViZTkxNzIyNjBhODQ0MjU3YWIyNSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTY5NjU4MzM0NywiZXhwIjoxNjk2NjY5NzQ3fQ.yxdHyX40ZThsNEZJTNakhM6pAVCC0TI1KwZgrH0jmgE`)
            .send(testProduct);

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true); 
        if ('error' in response.body) {
            expect(response.body.error).toBe('Conflict');
        }
    });
    beforeEach(async () => {
        await Product.deleteMany({ title: testProduct.title });
    });

    it('should add product with valid credentials', async () => {
        const response = await request(app)
            .post('/product-add')
            .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTViZTkxNzIyNjBhODQ0MjU3YWIyNSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTY5NjU4MzM0NywiZXhwIjoxNjk2NjY5NzQ3fQ.yxdHyX40ZThsNEZJTNakhM6pAVCC0TI1KwZgrH0jmgE`)
            .send(testProduct);

        expect(response.status).toBe(201);
        expect(response.body).toBeTruthy();
    });
    afterAll(async () => {
        await Product.deleteMany({ title: testProduct.title });
    });
});
