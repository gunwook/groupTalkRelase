import * as Joi from 'joi';
import Validation from '../validation';
import { ILetterModel } from './model';


class LetterValidation extends Validation {

    constructor() {
        super();
    }
    
    createLetter(
        params: ILetterModel
    ): Joi.ValidationResult < ILetterModel > {
        const schema: Joi.Schema = Joi.object().keys({
            send_nm : Joi.string().required(),
            receive_nm : Joi.string().required(),
            image : Joi.string().required(),
            title : Joi.string().required(),
            message : Joi.string().required(),
            letter_type : Joi.string().required(),
            visible : Joi.string().required()
        });

        return Joi.validate(params, schema);
    }
}

export default new LetterValidation();
