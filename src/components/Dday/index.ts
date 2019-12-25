import { HttpError } from '../../config/error';
import { NextFunction, Request, Response } from 'express';
import DdayService from './service'
import {IDdayModel , DListModel ,ResultDdayType} from './model'
import CError from '../../utils/CError';

export async function create(data : IDdayModel): Promise < IDdayModel> {
    return await DdayService.create(data);
}

export async function update(data : IDdayModel , userId : string): Promise < IDdayModel> {
    return await DdayService.update(data , userId);
}

export async function get(limit : number , offset : number , group_id : string) : Promise < ResultDdayType > {
    return await DdayService.get(limit , offset , group_id);
}

export async function getId(id : number) : Promise <IDdayModel> {
    return await DdayService.getId(id)
}

export async function deleteId(id: number) : Promise<IDdayModel> {
    return await DdayService.deleteId(id)
}