import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import app from '../server/server';
import HttpError from '../error';
import * as http from 'http';
import {logger} from '../../utils/logger'
import { findOne } from '../../components/User';
import { IUserModel } from '../../components/User/model';

interface RequestWithUser extends Request {
    user: object | string;
}

export interface JWtUser {
    id : string
}

/**
 * @param {RequestWithUser} req 
 * @param {Response} res 
 * @param {NextFunction} next
 * @returns {void}
 */
export function isAuthenticated(req: RequestWithUser, res: Response, next: NextFunction): void {
    const token: any = req.headers['token'];

    if (token) {
        try {
            const user: object | string = jwt.verify(token, app.get('secret'));

            req.user = user['id'];

            return next();

        } catch (error) {
            return next(new HttpError(401, http.STATUS_CODES[401]));
        }
    }

    return next(new HttpError(400, 'No token provided'));
}



/**
 * @param {string} token 해당 유저 토큰 정보
 * @returns {ojbect | string} 유저 정보 Returns
 */
export function getUserInfo(token : string) : Promise<IUserModel> {
    return new Promise((resolve , reject) => {
        if(token){
            try {
                const user: JWtUser = (jwt.verify(token, app.get('secret')) as JWtUser);
                
                findOne(user.id).then(user => {
                    resolve(user)
                }).catch(error => {
                    logger.error('find user error')
                    reject()
                })
            } catch (error) {
                logger.error('token provided error')
                reject()
            }
        }else {
            logger.error('No token provided')
            reject()
        }
    })
}
