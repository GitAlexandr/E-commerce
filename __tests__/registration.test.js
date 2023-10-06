const request = require('supertest');
const app = require('../index');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { JsonWebTokenError } = require('jsonwebtoken');

const testUser = {
    username: 'testuser1',
    password: 'testpassword1', 
};

beforeAll(async () => {
    jest.setTimeout(40000);

    
    await User.deleteMany({username: testUser.username})

    const hashPassword = bcrypt.hashSync(testUser.password, 7);
    const user = new User({
        username: testUser.username,
        password: hashPassword,
    });
    await user.save();
});


describe('POST /auth/registration', () => {

    beforeEach(async () => {
        await User.deleteMany({ username: testUser.username });
    });

    it('should log in a user with valid credentials', async () => {
        const response = await request(app)
            .post('/auth/registration')
            .send(testUser);

        expect(response.status).toBe(201); 
        expect(response.body.status).toBe(true); 
        expect(response.body.message).toBe('Пользователь успешно зарегистрирован'); 
    });

    it('should return 409 when user already exists', async () => {
        await User.create({ username: testUser.username, password: 'hashedPassword' });
    
        const response = await request(app)
            .post('/auth/registration')
            .send(testUser); 
    
        expect(response.status).toBe(409); 
        expect(response.body.status).toBe(false);
        expect(response.body.error).toBe('Conflict'); 
    });

    it('should return 401 when password is incorrect', async () => {
        const correctPassword = 'correctpassword';
        await User.create({ username: testUser.username, password: bcrypt.hashSync(correctPassword, 7) });
    
        const response = await request(app)
            .post('/auth/registration')
            .send({ username: testUser.username, password: 'incorrectpassword' });
    
        expect(response.status).toBe(400); 
        expect(response.body.status).toBe(false); 
        expect(response.body.error).toBe('Bad Request');
    });
    

    afterAll(async () => {
        await User.findOneAndDelete({ username: testUser.username });
    });
});
