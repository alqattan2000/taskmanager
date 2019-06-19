const validator = require('validator')
// express setup 
const express = require('express')
const app = express()
const port = process.env.PORT || 3000 // configure the port number
app.use(express.json()) // to make express use json 

// add models
const User = require('./models/user')
const Task = require('./models/task')

// requesting router
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
app.use(userRouter)



require('./db/mongoose') // to make sure file will be run and we connect to database


app.listen(port, () => {
    console.log('Server is pp on port: ' + port)
})