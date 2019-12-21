import * as Joi from 'joi';
import Validation from '../validation';
import { IUserModel } from '../User/model';
import { IPassword } from './interface';


class AuthValidation extends Validation {

    constructor() {
        super();
    }
    
    createUser(
        params: IUserModel
    ): Joi.ValidationResult < IUserModel > {
        const schema: Joi.Schema = Joi.object().keys({
            name : Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });

        return Joi.validate(params, schema);
    }
  
    getUser(
        params: IUserModel
    ): Joi.ValidationResult < IUserModel > {
        const schema: Joi.Schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });

        return Joi.validate(params, schema);
    }
    
    
    getEmail(
        email: string
    ) : Joi.ValidationResult <string>{
        return Joi.string().required().validate(email)
    }


    getToken(
        token: string
    ) : Joi.ValidationResult <string>{
        return Joi.string().required().validate(token)
    }

    createPassword(
        params : IPassword
    ) : Joi.ValidationResult < IPassword > {
        const schema: Joi.Schema = Joi.object().keys({
            auth_code : Joi.string().required(),
            password: Joi.string().required()
        });

        return Joi.validate(params, schema);
    }
}

export default new AuthValidation();
