const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

/* Tasks APIs */
// Add Task
router.post('/tasks', async(req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch (e){
        res.status(400).send(e)
    }
    
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

// retrieve Tasks
router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch(e) {
        res.status(500).send()
    }


    // Task.find({}).then((tasks) => {
    //     if (!tasks) {
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// retrieve Task by ID
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    if (!validator.isMongoId(_id)){
        return res.status(400).send('invalid ID Provided')
    }
    try {
        const task = await Task.findById(_id)
        if (!task) {
        return res.status(404).send()
        }
        res.status(200).send(task)
    } catch(e) {
        res.status(500).send(e)
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //         console.log('as')
    //     }
    //     res.status(200).send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

//update Task 
router.patch('/tasks/:id',async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['TaskName','completed']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid update'})
    }
    if (!validator.isMongoId(_id)){
        return res.status(400).send('invalid ID Provided')}
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, {new:true,runValidators:true})
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        
            res.status(400).send(e)
        

    }
})

// delete Task
router.delete('/tasks/:id',async(req,res)=>{
    const _id = req.params.id
    if (!validator.isMongoId(_id)){
        return res.status(400).send('invalid ID Provided')}
        try {
            const task = await Task.findByIdAndDelete(_id)
            if (!task) { return res.status(404).send() }
            res.status(200).send(task)
        } catch (e) {
            res.status(500).send(e)
        }
})
module.exports = router