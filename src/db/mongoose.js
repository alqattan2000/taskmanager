const mongoose = require('mongoose')
//course
// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'tasks-manager-apiuniq'
//mlab
//const connectionURL = 'mongodb://tmuser:tmpass123@ds341247.mlab.com:41247'
// const databaseName = 'task-manager'
// const validator = require('validator')

mongoose.connect(process.env.CONNECTION_URL + '/' + process.env.DATABASE_NAME, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })


//      console.log(mongoose.STATES)

// console.log(mongoose.STATES.toString)
    
// const me = new User({
//     name: 'Joelle',
//     email: 'alqattan2018@gmail.com   ',
//     password: 'Kuwait@55c    ',

// })
// me.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })




// newTask.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })