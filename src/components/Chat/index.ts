import { HttpError } from '../../config/error';
import { NextFunction, Request, Response } from 'express';
import ChatService from './service'
import ChatModel, {IChatModel , ResultChatType}  from './model'
import CError from '../../utils/CError';
import * as jwtConfig from '../../config/middleware/jwtAuth';
import { model } from 'mongoose';

export async function createChat(data : IChatModel): Promise < IChatModel> {
    return await ChatService.createChat(data);
}

export async function getChat(limit : number , offset : number , roomId : string) : Promise < ResultChatType> {
    return await ChatService.getChat(limit, offset , roomId);
}

export async function uploadChat(req: Request, res: Response, next: NextFunction): Promise < void >  {
    try {
        const jwt = await jwtConfig.getUserInfo(req.body.token) 

        let listOfItems : IChatModel[] = [] 
        for(let i in req.files){
            let file = req.files[i]
           
            if(file) {
                let model : IChatModel = new ChatModel({
                    image : file.key,
                    date : req.body.date,
                    room_id : req.body.room_id,
                    email :jwt.email,
                    name : jwt.name,
                    message : "",
                    profile_img : jwt.profile_img
                })

                listOfItems.push(model)

                await ChatService.createChat(model);
            }
        }

        if (listOfItems.length > 0) {
            res.json({
                status: 200,
                logged: true,
                message: 'Upload in successfull' ,
                data : listOfItems
            });            
        }else {
            res.json({
                status: 400,
                logged: true,
                message: 'Upload in failed'
            });  
        }

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