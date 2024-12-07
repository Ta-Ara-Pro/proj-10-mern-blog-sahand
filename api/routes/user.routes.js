import express from 'express'
import { test, updateUser } from '../controllers/user.controller.js';
import { ImageUploader, uploadMiddleware } from '../controllers/imageUpload.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test',  test)
router.put('/update/:userId',verifyToken, updateUser )


router.post('/cloudinary', uploadMiddleware, ImageUploader); 


export default router;