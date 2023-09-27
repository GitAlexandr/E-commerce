const request = require('supertest');
const app = require('../index'); // Adjust the path to your app's entry file if needed
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Define a test user
const testUser = {
    username: 'testuser',
    password: 'testpassword', // Password before hashing
};

beforeAll(async () => {
    // Create and save the test user before running tests
    const hashPassword = bcrypt.hashSync(testUser.password, 7);
    const user = new User({
        username: testUser.username,
        password: hashPassword,
        roles: ['USER'],
    });
    await user.save();
});

describe('POST /auth/login', () => {
    it('should log in a user with valid credentials', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send(testUser);

        expect(response.status).toBe(200);
        expect(response.body.token).toBeTruthy();
    });

    it('should return 404 when user is not found', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ username: 'nonexistentuser', password: 'testpassword' });

        expect(response.status).toBe(404);
        expect(response.body.status).toBe(false);
        expect(response.body.error).toBe('Not Found');
    });

    it('should return 401 when password is incorrect', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ username: testUser.username, password: 'incorrectpassword' });

        expect(response.status).toBe(401);
        expect(response.body.status).toBe(false);
        expect(response.body.error).toBe('Unauthorized');
    });
});

afterAll(async () => {
    // Clean up by removing the test user
    await User.findOneAndDelete({ username: testUser.username });
});
