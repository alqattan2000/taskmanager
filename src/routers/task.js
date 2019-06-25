const auth = require('../middleware/auth')
const validator = require('validator')
const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

/* Tasks APIs */
// Add Task
router.post('/tasks', auth, async(req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
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
router.get('/tasks', auth , async (req, res) => {

    try {
        /*one solution
        const tasks = await Task.find({owner: req.user._id})
        second solution */
       await req.user.populate('tasks').execPopulate()
        res.status(200).send(req.user.tasks)
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
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
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
router.patch('/tasks/:id', auth ,async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['TaskName','completed']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid update!!'})
    }
    try {
        const task = await Task.findOne({_id,owner:req.user._id})
        
        // const task = await Task.findByIdAndUpdate(_id, req.body, {new:true,runValidators:true})
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()
        res.status(200).send(task)
    } catch (e) {
        
            res.status(400).send(e)
        

    }
})

// delete Task
router.delete('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id
        try {
            const task = await Task.findOneAndDelete({_id,owner:req.user._id})
            if (!task) { return res.status(404).send() }
            res.status(200).send(task)
        } catch (e) {
            res.status(500).send(e)
        }
})
module.exports = router