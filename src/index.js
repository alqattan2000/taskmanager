//const validator = require('validator')
// express setup 
const express = require('express')
const app = express()
const port = process.env.PORT || 3000 // configure the port number

// // add models
// const User = require('./models/user')
// const Task = require('./models/task')

// app.use((req,res,next) =>{

//          res.status(503).send('Maintenance mode')

// })

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
app.use(express.json()) // to make express use json 
// requesting router
app.use(userRouter)
app.use(taskRouter)



require('./db/mongoose') // to make sure file will be run and we connect to database


app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})
// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async () => {
//     // const task = await Task.findById('5d10a81f2693f8483806da1c')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//     // const user = await User.findById('5d0f30d305a57f0017f74c4d')
//     // await user.populate('tasks').execPopulate()
//     // console.log(user.tasks)
    
// }
// main()