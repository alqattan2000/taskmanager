const mongoose = require('mongoose')
//course
// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'tasks-manager-api'
//mlab
const connectionURL = 'mongodb://mongouser:mongopass01@ds133017.mlab.com:33017'
const databaseName = 'qattandb'
// const validator = require('validator')

mongoose.connect(connectionURL + '/' + databaseName, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })



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