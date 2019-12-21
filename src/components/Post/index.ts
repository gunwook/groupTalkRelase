import PostService from './service'
import {IPostModel , ResultPostType} from './model'
import { HttpError } from '../../config/error';
import * as jwtConfig from '../../config/middleware/jwtAuth';
import { NextFunction, Request, Response } from 'express';
export async function createPost(data : IPostModel): Promise < IPostModel > {
    const post = await PostService.createPost(data);
    return post
}

export async function getPost(groupId : string , offset : number , limit : number) : Promise < ResultPostType>  {
    const post = await PostService.getPost(groupId , offset , limit)
    return post
}

export async function getPostId(postId : number) : Promise <IPostModel> {
    return await PostService.getPostDetail(postId)
} 

export async function uploadPost(req: Request, res: Response, next: NextFunction): Promise < void >  {
    try {
        let imageUrls : string[] = []

        for(let i in req.files){
            let file = req.files[i]

            if(file) {
                imageUrls.push(file.key)
            }
        }

        res.json({
            status: 200,
            logged: true,
            message: imageUrls
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