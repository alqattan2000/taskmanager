const express = require('express')
const router = new express.Router()
const User = require('../models/user')

/* Users APIs */
// Add user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
    

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

// retrieve users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch(e) {
        res.status(500).send(e)
    }
})

// retrieve user by ID
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    if (!validator.isMongoId(_id)){
        return res.status(400).send('invalid ID Provided')}
    try{
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch(e) {
        res.status(500).send()
    }
})

// Update user
router.patch("/users/:id", async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','age','password']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    if (!validator.isMongoId(_id)){
        return res.status(400).send('invalid ID Provided')}
        try{
            const user = await User.findByIdAndUpdate(_id, req.body , { new: true, runValidators:true })
            if (!user){
                return res.stat(404).send()
            }
            res.status(200).send(user)
        } catch(e) {
            res.status(400).send(e)
        }

})

//delete user
router.delete('/users/:id',async(req,res)=>{
    const _id = req.params.id
    if (!validator.isMongoId(_id)){
        return res.status(400).send('invalid ID Provided')}
        try {
            const user = await User.findByIdAndDelete(_id)
            if (!user) { return res.status(404).send() }
            res.status(200).send(user)
        } catch (e) {
            res.status(500).send(e)
        }
})

module.exports = router