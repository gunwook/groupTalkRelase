import {ILetterService} from './interface'
import * as Joi from 'joi';
import LetterValidation from './validation';
import LetterModel, { ILetterModel } from './model';
import CError from '../../utils/CError';
export const LetterService  : ILetterService =  {
    async createLetter(data : ILetterModel): Promise < ILetterModel > {
        try {
            const validate: Joi.ValidationResult < ILetterModel > = LetterValidation.createLetter(data.toObject());
            
            if (validate.error) {
                throw new CError(validate.error.message);
            }
           
            const saved: ILetterModel = await data.save();

            return saved;
        } catch (error) {
            throw new CError(error);
        }
    }
}

export default LetterService;