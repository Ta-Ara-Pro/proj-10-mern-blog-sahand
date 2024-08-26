import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'

export const signup = async(req, res) => { 
    try {
       const { username, email, password } = req.body;
       if(!username || !email || !password || username === ''|| email === ''|| password === '') {
        return res.status(400).json('All fields are required')
       };

       const hashPassword = bcryptjs.hashSync( password, 10) // this method has the sync inside itself

       const newUser = new User({
        username,
         email, 
         password : hashPassword,
       })
       
       await newUser.save();
       res.status(201).json('User created successfully')
    } catch (error) {
        res.status(409).json({ 'Error signing up': error.message  }) 
        console.error('Error in siguning up new account:', error)        
    }
}