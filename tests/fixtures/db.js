const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne ={
    _id: userOneId,
    name: 'testUser1',
    email: 'alqattan2000@gmail.com',
    password: 'pass1234',
    tokens:[{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}


const userTwoId = new mongoose.Types.ObjectId()
const userTwo ={
    _id: userTwoId,
    name: 'testUser2',
    email: 'lilian.qattan@gmail.com',
    password: 'pass1234',
    tokens:[{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    TaskName: 'First Task',
    completed: true,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    TaskName: 'second Task',
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    TaskName: '3  Task',
    completed : true,
    owner: userTwo._id
}

const setupDatabase = async() =>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskThree,
    setupDatabase
}