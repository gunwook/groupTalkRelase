import UserService from './service';
import { HttpError } from '../../config/error';
import { IUserModel } from './model';
import { NextFunction, Request, Response } from 'express';


/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(id : string): Promise < IUserModel > {
    return await UserService.findOne(id);
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(id : string): Promise < IUserModel > {
    return await UserService.remove(id);
}
