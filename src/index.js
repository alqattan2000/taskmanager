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
const bcryptjs = require('bcryptjs')

// const pet = {
//     name: 'Hal'
// }
// pet.toJSON = function () {
//     console.log(this)
//     return this
// }
// console.log(JSON.stringify(pet))

// const myfun = async()=>{
//     const password = 'Red12345!'
//     const hashedPassword = await bcryptjs.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)
// }

// myfun()