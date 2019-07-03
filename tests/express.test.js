const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne ={
    name: 'testUser',
    email: 'alqattan2000@gmail.com',
    password: 'pass1234!!'
                }

beforeEach(async()=> {
    await User.deleteMany({})
    const user = new User(userOne)
    await user.save()
})

// afterEach(()=> {
//     console.log('afterEach')
// })

test('Shoud signup a new user', async()=>{
    await request(app).post('/users').send({
        name: 'Joelle',
        email: 'alqattan2000@hotmail.com',
        password: 'pass1234' 
    }).expect(201)
})

test('Should login for existing user', async()=>{
    await request(app).post('/users/login')
    
})