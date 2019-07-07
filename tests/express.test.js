const request = require('supertest')

const {userOne,userOneId,setupDatabase} = require('./fixtures/db')

const app = require('../src/app')
const User = require('../src/models/user')



beforeEach(setupDatabase)
    // const user = new User(userOne)
    // await user.save()


// afterEach(()=> {
//     console.log('afterEach')
// })

test('Should signup a new user', async()=>{
    const response = await request(app).post('/users').send({
        name: 'Joelle',
        email: 'alqattan2000@hotmail.com',
        password: 'pass1234' 
    }).expect(201)
    // Assert that uhe database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body.user.name).toBe('Joelle')
    expect(response.body.user.password).not.toBe('pass1234')
    // Assertions about the object result
    expect(response.body).toMatchObject({ user :{
        name: 'Joelle',
        email: 'alqattan2000@hotmail.com',
        },
        token : user.tokens[0].token
    })
 })

test('Should login for existing user', async()=>{
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body.token).toBe(user.tokens[1].token)
})


test('Should Not login for non-existing user', async()=>{
    await request(app).post('/users/login').send({
        email: 'alqat@ds.com',
        password: 'pass12541'
    }).expect(400)
    
})
test('Should get profile', async()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200) 
})
test('Should not get profile for un auth users', async()=>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401) 
})

// test('Should close Account', async()=>{
//     const response = await request(app)
//     .delete('/users/me')
//     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//     .send()
//     .expect(200) 
//     const user = await User.findById(response.body._id)
//     console.log(user)
//     expect(user).toBeNull()
// })

test('Should Not close Account (No token)', async()=>{
     await request(app)
    .delete('/users/me')
    .send()
    .expect(401) 
})

test('Should Upload Avatar image', async()=>{
    await request(app)
        .post('/user/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await  User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})
test ('Should Update the User Name "valid Field "',async ()=>{
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({name: 'Lilian'})
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toBe('Lilian')

})
test ('Should not Update the User Name "Invalid Field "', async ()=>{
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({location: 'Lilian'})
        .expect(400)

})
test('Should not close Account (non exist token)', async()=>{
    const token1 = 'Bearer ' + userOne.tokens[0].token.replace('e','A')
    await request(app)
    .delete('/users/me')
    .set('Authorization', token1)
    .send()
    .expect(401) 
})