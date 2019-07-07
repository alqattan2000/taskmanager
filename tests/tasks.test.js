const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {userTwo,userOne,userOneId,setupDatabase,taskOne,taskThree} = require('./fixtures/db')
beforeEach(setupDatabase)


test('Should Create task for user', async ()=>{
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            TaskName: 'Write down your notes for this course',
            completed : false
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task.owner).toEqual(userOneId) 
})


test('Should show all  tasks for userOne', async ()=>{
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
        expect(response.body.length).toBe(2)
})
test('Should show only  completed tasks for userOne', async ()=>{
    const response = await request(app)
        .get('/tasks?completed=true')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0].completed).toEqual(true)
})

test('Should not allow UserTwo delete task for userOne', async ()=>{
    const response = await request(app)
        .delete('/tasks/' + taskOne._id )
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})

test('Should delete his own task UserTwo', async ()=>{
    const response = await request(app)
        .delete('/tasks/' + taskThree._id )
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200)
        const task = await Task.findById(taskThree._id)
        expect(task).toBeNull()
    })