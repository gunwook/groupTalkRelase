import * as Joi from 'joi';
import Validation from '../validation';
import { IChatModel } from './model';


class ChatValidation extends Validation {

    constructor() {
        super();
    }
    
    createChat(
        params: IChatModel
    ): Joi.ValidationResult < IChatModel > {
        const schema: Joi.Schema = Joi.object().keys({
            message : Joi.string().allow('').required(),
            date : Joi.date().required(),
            email : Joi.string().required(),
            room_id : Joi.string().required(),
            name  : Joi.string().required(),
            image : Joi.string().allow('').required(),
            profile_img : Joi.string().allow('').required()
        });

        return Joi.validate(params, schema);
    }


    getChat(
        roomId : string
    ) : Joi.ValidationResult< string > {
        return Joi.string().required().validate(roomId)
    }
}

export default new ChatValidation();
