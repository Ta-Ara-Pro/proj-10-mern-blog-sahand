import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: 'dbzbqnfbs',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export default cloudinary;
// module.exports= cloudinary;
// (async function)() {
//     const results = awit cloudinary.uploader.uploade('')
// }