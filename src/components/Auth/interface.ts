import { IUserModel } from '../User/model';
import { Request } from 'express';

export interface IAuthService {
    createUser(req : Request , IUserModel: IUserModel): Promise < IUserModel > ;
    getUser(IUserModel: IUserModel): Promise < IUserModel >;
    sendEmail(email) : Promise <void>;
    getEmail(email) : Promise <IUserModel>
    updateToken(id , token) : Promise<IUserModel>
    searchEmail(email) : Promise <IUserModel[]>;
    createPassword(code : string , password : string) : Promise <IUserModel>
} 


export interface IPassword {
    auth_code : string,
    password : string
}