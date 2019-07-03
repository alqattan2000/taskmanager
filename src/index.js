const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
//const validator = require('validator')
// express setup 
const express = require('express')
const app = express()
const port = process.env.PORT // configure the port number

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname ) //Appending .jpg
    }
  })
const upload = multer({
    dest: 'images',
    limits: {
        fileSize:  1000000   //Bytes 1,000,000 Bytes = 1 Mb
    },storage: storage,
    fileFilter(req,file,cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please Upload a Word Doc'))
        }
        cb(undefined,true)
        /*  cb(new Error('file must be ...'))
            cb(undefined,true)
            cb(undefined,false)                 */
     }
})
const errorMiddleware = (req,res,next)=>{
    throw new Error('From my middleware')

}


app.post('/upload', upload.single('upload'),(req,res)=>{
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

app.use(express.json()) // to make express use json 
// requesting router
app.use(userRouter)
app.use(taskRouter)



require('./db/mongoose') // to make sure file will be run and we connect to database


app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})
