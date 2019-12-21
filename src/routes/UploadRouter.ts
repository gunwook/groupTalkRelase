import { uploadChat } from '../components/Chat';
import { uploadPost } from '../components/Post'
import { Router } from 'express';
import upload from '../utils/multer'
import { NextFunction, Request, Response } from 'express';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/chat', upload.array('photos' , 3), uploadChat);
router.post('/story' , upload.array('photos' , 3) , uploadPost)
/**
 * @export {express.Router}
 */
export default router;
