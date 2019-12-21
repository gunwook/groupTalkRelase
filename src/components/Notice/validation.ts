import * as Joi from 'joi';
import Validation from '../validation';
import { INoticeModel} from './model';
import { GroupType, UserType } from '../../utils/TypeUtils';


class NoticeValidation extends Validation {

    constructor() {
        super();
    }

    create(
        params: INoticeModel
    ): Joi.ValidationResult < INoticeModel > {
        const schema: Joi.Schema = Joi.object().keys({
            notice_id : Joi.number().optional(),
            profile_img : Joi.string().optional(),
            date : Joi.date().required(),
            title : Joi.string().required(),
            content : Joi.string().required(),
            visible : Joi.string().optional(),
            content_url : Joi.string().optional(),
            user_id : Joi.string().required()
        });

        return Joi.validate(params, schema);
    }

    get(
        user_id : string,
        offset : number,
        limit : number
    ) : Joi.ValidationResult<UserType> {
        const schema = Joi.object({
            user_id : Joi.string().required(),
            offset : Joi.number().required(),
            limit : Joi.number().required()
        })

        return schema.validate({user_id ,offset , limit})
    }

}

export default new NoticeValidation();
