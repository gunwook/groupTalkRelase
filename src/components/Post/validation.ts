import * as Joi from 'joi';
import Validation from '../validation';
import { IPostModel} from './model';
import { join } from 'path';
import { GroupType } from '../../utils/TypeUtils';


class PostValidation extends Validation {

    constructor() {
        super();
    }

    createPost(
        params: IPostModel
    ): Joi.ValidationResult < IPostModel > {
        const schema: Joi.Schema = Joi.object().keys({
            image : Joi.array().optional(),
            date : Joi.date().required(),
            message : Joi.string().required(),
            tags : Joi.array().optional(),
            title : Joi.string().required(),
            sub_title : Joi.string().optional(),
            alignment : Joi.number().optional(),
            visible : Joi.string().optional(),
            user_id : Joi.string().required(),
            group_id : Joi.string().required(),
            _user : Joi.optional()
        });

        return Joi.validate(params, schema);
    }

    getPost(
        group_id : string,
        offset : number,
        limit : number
    ) : Joi.ValidationResult<GroupType> {
        const schema = Joi.object({
            group_id : Joi.string().required(),
            offset : Joi.number().required(),
            limit : Joi.number().required()
        })

        return schema.validate({group_id ,offset , limit})
    }

    getPostId(
        post_id : number
    ) : Joi.ValidationResult<number> {
        return Joi.number().required().validate(post_id)
    }

}

export default new PostValidation();
