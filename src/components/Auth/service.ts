import * as Joi from 'joi';
import AuthValidation from './validation';
import UserModel, { IUserModel } from '../User/model';
import { IAuthService, IPassword } from './interface';
import { getSocketRoom, makeid } from '../../utils/CommonUtils'
import CError from '../../utils/CError';
import {createTransport} from 'nodemailer'
import Mail from '../../utils/Mail';
import Redis from '../../utils/RedisUtils'
import { RedisCode } from '../../utils/CodeUtils';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { Types } from 'mongoose';

const AuthService: IAuthService = {

    
    async createUser(req : Request , body: IUserModel): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < IUserModel > = AuthValidation.createUser(body);

            if (validate.error) {
                throw new CError(validate.error.message);
            }

            const user: IUserModel = new UserModel({
                email: body.email,
                profile_img : req.file["key"],
                name : body.name,
                password: body.password,
                fcm_token : '',
                socketRoom : getSocketRoom()
            });

            const query: IUserModel = await UserModel.findOne({
                email: body.email
            });

            if (query) {
                throw new CError('This email already exists');
            }

            const saved: IUserModel = await user.save();

            return saved;
        } catch (error) {
            throw new CError(error);
        }
    },
    
    async getUser(body: IUserModel): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < IUserModel > = AuthValidation.getUser(body);

            if (validate.error) {
                throw new CError(validate.error.message);
            }

            const user: IUserModel = await UserModel.findOne({
                email: body.email
            });
        
            const isMatched: boolean = await user.comparePassword(body.password);
 
            if (isMatched) {
                return user;
            }

            throw new CError('Invalid password or email');
            
        } catch (error) {
            throw new CError(error);
        }
    },

    async sendEmail(email : string) : Promise <void> {
        try {
            const validate: Joi.ValidationResult < string > = AuthValidation.getEmail(email);

            if (validate.error) {
                throw new CError(validate.error.message);
            }

            const user: IUserModel = await UserModel.findOne({
                "email" : email
            });

            if (user) {
                let code = `${makeid(6)}${new Date().getTime()}`

                Mail.to = "eorjstldzm@gmail.com";
                Mail.subject = "그룹 채팅 어플에서 계정 찾기"
                Mail.message = "그룹 채팅 어플에서 드리는 계정 찾기에 관련된 코드 입니다. \n code : " + code;
                await Mail.sendMail();
                
                await Redis.instance.setObject(RedisCode.AUTH_CODE,code,email,3600)
            }else {
                throw new CError('Email does not exist');
            }
            
        } catch (error) {
            throw new CError(error);
        }
    },

    async searchEmail(email : string) : Promise <IUserModel[]> {
        try {
            const validate: Joi.ValidationResult < string > = AuthValidation.getEmail(email);

            if (validate.error) {
                throw new CError(validate.error.message);
            }

            const user: IUserModel[] = await UserModel.find({
                "email" : {"$regex" : email , "$options": "i"}
            },{
                email : 1
            }).limit(30);

            return user            
        } catch (error) {
            throw new CError(error);
        }
    },

    async getEmail(email : string) : Promise <IUserModel> {
        try {
            const validate: Joi.ValidationResult < string > = AuthValidation.getEmail(email);

            if (validate.error) {
                throw new CError(validate.error.message);
            }

            const user: IUserModel = await UserModel.findOne({email : email})

            return user            
        } catch (error) {
            throw new CError(error);
        }
    },

    async updateToken(id : string , token : string) : Promise <IUserModel> {
        try {
            const validate: Joi.ValidationResult < string > = AuthValidation.getToken(token);

            if (validate.error) {
                throw new CError(validate.error.message);
            }

            let user = await UserModel.findOneAndUpdate({ _id : Types.ObjectId(id)} , { $set : {fcm_token :token}}, { upsert: true , new : true })
            
            return user
        } catch (error) {
            throw new CError(error);
        }
    },

    async createPassword(auth_code : string , password : string) : Promise <IUserModel> {
        try {
            const validate: Joi.ValidationResult < IPassword > = AuthValidation.createPassword({auth_code , password});

            if (validate.error) {
                throw new CError(validate.error.message);
            }
            let email = await Redis.instance.getObject(RedisCode.AUTH_CODE,auth_code)

            if (email.length != 0) {
                if (email[0]){
                    let user_email = email[0].substring(1,email[0].length - 1)
                    const salt: string = await bcrypt.genSalt(10);

                    const hash: string = await bcrypt.hash(password, salt);

                    const user: IUserModel = await UserModel.findOneAndUpdate({email : user_email} , {$set : {"password" : hash}} , {new : true})

                    if (user) {
                        await Redis.instance.hdeleteKey(RedisCode.AUTH_CODE,auth_code)

                        return user
                    }else {
                        throw new CError('Email does not exist');
                    }
                }else {
                    throw new CError('Auth_code does not exist');
                }
            }else {
                throw new CError('Auth_code does not exist');
            }
        } catch (error) {
            throw new CError(error);
        }
    }
};

export default AuthService;
