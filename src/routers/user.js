
const multer = require('multer')


const auth = require('../middleware/auth')
const validator = require('validator')
const express = require('express')
const router = new express.Router()
const User = require('../models/user')


/* Users APIs */
// Add user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        
        await user.save()
        const token = await user.generateAuthToken()
        
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

//user login
router.post('/users/login', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user ,token})
    } catch (e) {
        res.status(400).send(e)
    }
})
router.post('/users/logout',auth, async(req,res)=>{
try {
    req.user.tokens = req.user.tokens.filter((token)=>{
        return token.token !== req.token
    })
    await req.user.save()
    res.send(req.user)
} catch (e) {
    res.status(500).send()
}
})

router.post('/users/logoutAll',auth, async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
        
    }
})

router.post('/users/logoutAllButMe',auth, async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token === req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
        
    }
})

const upload = multer({
   // dest: 'avatar',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb) {
        console.log(file.originalname.toUpperCase())
        if(!file.originalname.toUpperCase().match(/\.(JPG|PNG|JPEG|GIF)$/)){
            return cb(new Error('Please Upload Images (jpg/jpeg/png/jif'))
        }
        cb(undefined,true)
    }
})

router.post('/user/me/avatar', auth, upload.single('avatar'),async(req,res)=>{
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send(req.user)
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

// retrieve my profile
router.get('/users/me', auth, async (req, res) => {
   res.send(req.user)
})

// retrieve users
// router.get('/users', auth, async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.status(200).send(users)
//     } catch(e) {
//         res.status(500).send(e)
//     }
// })

// retrieve user by ID
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     if (!validator.isMongoId(_id)){
//         return res.status(400).send('invalid ID Provided')}
//     try{
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.status(200).send(user)
//     } catch(e) {
//         res.status(500).send()
//     }
// })
// Update user me
router.patch("/users/me", auth, async (req, res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','age','password']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'})
    }
       try{
             updates.forEach((update) => req.user[update] = req.body[update])
            await req.user.save()
            // const user = await User.findByIdAndUpdate(_id, req.body , { new: true, runValidators:true })
            res.status(200).send(req.user)
        } catch(e) {
            res.status(400).send(e)
        }

})
// Update user
// router.patch("/users/:id", async (req, res) => {
//     const _id = req.params.id
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name','email','age','password']
//     const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
//     if (!isValidOperation) {
//         return res.status(400).send({error: 'Invalid updates'})
//     }
//     if (!validator.isMongoId(_id)){
//         return res.status(400).send('invalid ID Provided')}
//         try{
//             const user = await User.findById(_id)
//             updates.forEach((update) => user[update] = req.body[update])
//             await user.save()
//             // const user = await User.findByIdAndUpdate(_id, req.body , { new: true, runValidators:true })
//             if (!user){
//                 return res.stat(404).send()
//             }
//             res.status(200).send(user)
//         } catch(e) {
//             res.status(400).send(e)
//         }

// })

//delete user me
router.delete('/users/me',auth ,async(req,res)=>{
    try {
        await req.user.remove()
        res.status(200).send(req.user)
        // to read image into HTML <img src="data:image/jpg:base64,<binaryOfTheImage>"
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/user/me/avatar',auth,async(req,res)=>{
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})
// //delete user
// router.delete('/users/:id',async(req,res)=>{
//     const _id = req.params.id
//     if (!validator.isMongoId(_id)){
//         return res.status(400).send('invalid ID Provided')}
//         try {
//             const user = await User.findByIdAndDelete(_id)
//             if (!user) { return res.status(404).send() }
//             res.status(200).send(user)
//         } catch (e) {
//             res.status(500).send(e)
//         }
// })





module.exports = router