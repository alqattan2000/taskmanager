require('../src/db/mongoose')
const Task = require('../src/models/task')

// const ID = '5d08bb2a27ae854280aa917e' 
// Task.findByIdAndDelete(ID).then((task)=>{
//     if (task){
//         console.log('Task: "' + task.TaskName + '" Has been deleted')
//     }else{
//         console.log('No Task with ID: "' + ID + '" is available to be deleted')
//     }
//     return Task.countDocuments({completed:false}).then((result)=>{
//         console.log(result)

//     }).catch((e)=>{
//         console.log(e)
//     })
// })

const deleteAndListUncompleted = async (id)=>{
    const task = await Task.findByIdAndDelete(id)
    const cont = await Task.countDocuments({completed: false})
    return {task,cont}
}

deleteAndListUncompleted('5d08c5e827ae854280aa9186').then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})