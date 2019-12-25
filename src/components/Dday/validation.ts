import * as Joi from 'joi';
import Validation from '../validation';
import { IDdayModel } from './model';
import { UserType, GroupType } from '../../utils/TypeUtils';
import { Schema } from 'mongoose';


class DdayValidation extends Validation {

    constructor() {
        super();
    }

    create(
        params: IDdayModel
    ): Joi.ValidationResult < IDdayModel > {
        const schema: Joi.Schema = Joi.object().keys({
            start_dt : Joi.date().required(),
            end_dt : Joi.date().required(),
            group_id : Joi.string().required(),
            title : Joi.string().required(),
            visible_yn : Joi.string().required(),
            dday_list : Joi.array().optional(),
            _user : Joi.optional()
        });

        return Joi.validate(params, schema);
    }

    update(
        params: IDdayModel
    ): Joi.ValidationResult < IDdayModel > {
        const schema: Joi.Schema = Joi.object().keys({
            dday_id : Joi.number().required(),
            start_dt : Joi.date().required(),
            end_dt : Joi.date().required(),
            group_id : Joi.string().required(),
            title : Joi.string().required(),
            visible_yn : Joi.string().required(),
            dday_list : Joi.array().optional(),
            _user : Joi.optional()
        });

        return Joi.validate(params, schema);
    }


    get(
        group_id : string,
        offset : number,
        limit : number
    ) : Joi.ValidationResult< GroupType > {
        const schema = Joi.object({
            group_id : Joi.string(),
            offset : Joi.number(),
            limit : Joi.number()
        })
        
        return schema.validate({group_id, offset , limit})
    }


    checkId(
        id : number
    ) : Joi.ValidationResult<number> {
        return Joi.number().required().validate(id)
    }
}

export default new DdayValidation();
