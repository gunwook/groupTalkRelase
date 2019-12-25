import { Router } from 'express';
import FCMMannger from '../utils/FCMManager';
import CError from '../utils/CError';
import HttpError from '../config/error';

import AuthService from '../components/Auth/service';
import { IUserModel } from '../components/User/model';
import NoticeModel from '../components/Notice/model';
import { create } from '../components/Notice/index'

/**
 * @constant {express.Router}
 */
const router: Router = Router();


router.post('/' , async (req,res,next) => {
    try {
        const user : IUserModel = await AuthService.getEmail(req.body.data);

        const message = {
            push_id : user.fcm_token,
            type : req.body.type,
            data : JSON.stringify({ email : user["email"] , socketRoom : user["socketRoom"]})
        }

        FCMMannger.sendPush(message).then(response => {
            res.json({
                status: 200,
                logged: true,
                message: response
            });
        }).catch((err) => {
            throw new CError(err)
        })
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            message: error.message
        });
    }
})


/**
 * @export {express.Router}
 */
export default router;
