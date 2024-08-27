import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const Signup = async(req, res, next) => { 
    
       const { username, email, password } = req.body;
       if(!username || !email || !password || username === ''|| email === ''|| password === '') {
        // return res.status(400).json('All fields are required')
        next(errorHandler(400, 'All fields are required'));
       };

       const hashPassword = bcryptjs.hashSync( password, 10) // this method has the sync inside itself

       const newUser = new User({
        username,
         email, 
         password : hashPassword, 
       })
       try {
       await newUser.save();
       res.status(201).json('User created successfully')
    } catch (error) {
        next(error) 
        console.error('Error in siguning up new account:', error)        
    }
}