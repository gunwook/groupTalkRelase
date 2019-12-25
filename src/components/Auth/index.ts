import AuthService from './service';
import HttpError from '../../config/error';
import { IUserModel } from '../User/model';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import app from '../../config/server/server';


export async function signup(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IUserModel = await AuthService.createUser(req , req.body);
        const token: string = jwt.sign({ id: user.id }, app.get('secret'), {
            expiresIn: '7d'
        });
        
        res.json({
            status: 200,
            logged: true,
            token: token,
            profile_img : user.profile_img,
            room : user.socketRoom,
            email : user.email,
            message: 'Sign in successfull'
        });
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            message: error.message
        });
    }
}


export async function login(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IUserModel = await AuthService.getUser(req.body);

        const token: string = jwt.sign({ id: user.id }, app.get('secret'), {
            expiresIn: '7d'
        });
        
        res.json({
            status: 200,
            logged: true,
            token: token,
            profile_img : user.profile_img,
            room : user.socketRoom,
            email : user.email,
            message: 'Login in successfull'
        });

    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }

        res.json({
            status: 400,
            message: error.message
        });
    }
}

export async function searchEmail(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const emails = await AuthService.searchEmail(req.query.email);
        
        res.json({
            status: 200,
            logged: true,
            message: emails
        });

    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }

        res.json({
            status: 400,
            message: error.message
        });
    }
}


export async function fcmToken(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user = await AuthService.updateToken(req["user"] , req.body.token);
        
        res.json({
            status: 200,
            logged: true,
            message: user
        });

    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }

        res.json({
            status: 400,
            message: error.message
        });
    }
}

export async function email(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        await AuthService.sendEmail(req.query.email);
        
        res.json({
            status: 200,
            logged: true,
            message: 'Your email has been sent successfully.'
        });

    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }

        res.json({
            status: 400,
            message: error.message
        });
    }
}

export async function createPassword(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        await AuthService.createPassword(req.body.auth_code , req.body.password);
        
        res.json({
            status: 200,
            logged: true,
            message: 'Password change succeeded.'
        });

    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }

        res.json({
            status: 400,
            message: error.message
        });
    }
}
