import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'

dotenv.config();

mongoose
    .connect(
        process.env.MONGO_URI
    ).then(() => { 
        console.log('Mongodb is connected')
    }).catch((err) => {
        console.log({'Mongodb connection error': err})
    })

const app = express(); //create the application

app.listen(3000, () => {
    console.log('Server is running at port 3000')
})

app.use('/api/user', userRouter)
   