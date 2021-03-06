import * as Joi from 'joi';
import Validation from '../validation';
import { IMemoModel } from './model';
import { UserType } from '../../utils/TypeUtils';


class MemoValidation extends Validation {

    constructor() {
        super();
    }
    
    createMemo(
        params: IMemoModel
    ): Joi.ValidationResult < IMemoModel > {
        const schema: Joi.Schema = Joi.object().keys({
            title : Joi.string().required(),
            message : Joi.string().required(),
            date : Joi.date().required(),
            visible : Joi.string().required(),
            group_id : Joi.string().required(),
            _user : Joi.optional()
        });

        return Joi.validate(params, schema);
    }

    updateMemo(
        params: IMemoModel
    ): Joi.ValidationResult < IMemoModel > {
        const schema: Joi.Schema = Joi.object().keys({
            memo_id : Joi.number().required(),
            title : Joi.string().required(),
            message : Joi.string().required(),
            date : Joi.date().required(),
            visible : Joi.string().required(),
            group_id : Joi.string().required(),
            _user : Joi.optional()
        });

        return Joi.validate(params, schema);
    }

    getMemo(
        offset : number,
        limit : number
    ) : Joi.ValidationResult<UserType> {
        const schema = Joi.object({
            offset : Joi.number(),
            limit : Joi.number()
        })

        return schema.validate({offset , limit})
    }

    checkMemoId(
        memo_id : number
    ) : Joi.ValidationResult<number> {
        return Joi.number().required().validate(memo_id)
    }
}

export default new MemoValidation();
