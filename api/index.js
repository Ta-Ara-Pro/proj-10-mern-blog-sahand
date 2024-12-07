import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';

// import cors from 'cors'; 
// Import CORS middleware

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

app.use(express.json()); //allow to send json file to the backend
app.use(cookieParser());

// app.use(cors({
//     origin: 'http://localhost:5173', // Replace with your frontend origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     credentials: true, // Allow cookies if needed
//   }));

app.listen(3000, () => {
    console.log('Server is running at port 3000', 'http://localhost:3000',)
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRoutes)

// a middleware to handle errors more easily
app.use((err, req, res, next) => { 
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
   