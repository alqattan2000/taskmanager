const Task = require('./task')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        unique: true,
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error('Invalid email Address')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        default : 0,
        type: Number,
        validate(value) {
            if (value < 0 ){
                throw new Error('Invalid age')
            }

        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar :{
        type: Buffer
    }}
    ,{timestamps: true})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

// create user Token method
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'qattanthebest')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//create new function (findByCredentials)
userSchema.statics.findByCredentials = async(email,password) =>{
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user
}


// hash the plain test password before saving
userSchema.pre('save', async function (next) {
    const user = this
   if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
   }
    next()
})
//Delete user Tasks when user deleted
userSchema.pre('remove', async function (next) {
    const user = this
   await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports= User