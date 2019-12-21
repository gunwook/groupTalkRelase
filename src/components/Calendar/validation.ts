import * as Joi from 'joi';
import Validation from '../validation';
import { ICalendarModel } from './model';


class CalendarValidation extends Validation {

    constructor() {
        super();
    }
    
    create(
        params: ICalendarModel
    ): Joi.ValidationResult < ICalendarModel > {
        const schema: Joi.Schema = Joi.object().keys({
            start_dt : Joi.date().required(),
            message : Joi.string().required(),
            end_dt : Joi.date().optional(),
            check_yn : Joi.string().required(),
            type : Joi.number().required(),
            group_id : Joi.string().required()
        });

        return Joi.validate(params, schema);
    }
}

export default new CalendarValidation();
