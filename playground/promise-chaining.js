require('../src/db/mongoose')
const User = require('../src/models/user')

// 5d07486fd2da8e445cb31636

// User.findByIdAndUpdate('5d08b75727ae854280aa917a', {age:10}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({ age: 10})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async (id,age) =>{
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    console.log(user)
    console.log(count)
}

updateAgeAndCount('5d089c3327ae854280aa9175',10)