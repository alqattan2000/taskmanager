const {fahrenheitToCelsius,celsiusToFahrenheit,add} = require('../math')
const mongoose = require('../src/db/mongoose')

test('Should Convert From 32 F to 0 C', ()=>{
    expect(fahrenheitToCelsius(32)).toBe(0)
})
test('Should Convert From 0 C to 32 F ', ()=>{
    expect(celsiusToFahrenheit(0)).toBe(32)
})

// test('Async test demo',(done)=> {
//     setTimeout(()=>{
//         expect(1).toBe(2)
//         done()
//     },2000)
// // })
// test ('Able to Connect to DataBase', (done)=> {
// //    const v =  mongoose.STATES
// //    setTimeout(()=> {
// //     console.log(v)
//     done()
//    },2000)
   
// })

test('Testing Add',(done)=>{
    add(2,4).then((sum)=>{
        expect(sum).toBe(6)
        done()
    })
})

test ('Should add 2 numbers', async()=>{
    const sum = await add(2,4)
    expect(sum).toBe(6)
})

