import {IPostService} from './interface'
import * as Joi from 'joi';
import PostValidation from './validation';
import PostModel, { IPostModel, ResultPostType } from './model';
import CError from '../../utils/CError';
import { getPost } from '.';
import { Parameter, Common } from '../../utils/CodeUtils';
import { GroupType } from '../../utils/TypeUtils';
export const ChatService  : IPostService =  {
    async createPost(data : IPostModel): Promise < IPostModel > {
        try {
            const validate: Joi.ValidationResult < IPostModel > = PostValidation.createPost(data.toObject());
            
            if (validate.error) {
                throw new CError(validate.error.message);
            }
           
            const saved: IPostModel = await data.save();

            return saved;
        } catch (error) {
            throw new CError(error);
        }
    },
    async getPost(groupId : string , offset : number , limit : number) : Promise <ResultPostType> {

        const validate : Joi.ValidationResult<GroupType> = PostValidation.getPost(groupId,offset,limit)

        if(validate.error) {
            throw new CError(validate.error.message)
        }

        let task = []

        task.push(PostModel.find().populate(Parameter._USER,'-_id ' + `${Parameter.PROFILE_IMG} ${Parameter.NAME}`).skip(offset * limit).limit(limit).where(Parameter.GROUP_ID).equals(groupId).where(Parameter.VISIBLE).equals(Common.VISIBLE))
        task.push(PostModel.countDocuments({ group_id : groupId}).exec())

        return Promise.all(task).then(resultArray => {
            let result : ResultPostType = {
                data : resultArray[0],
                count : resultArray[1]
            }

            return result
        }).catch(error => {
            throw new CError(error)
        })
    },
    async getPostDetail(post_id : number) : Promise <IPostModel> {

        try {
            const validate : Joi.ValidationResult<number> = PostValidation.getPostId(post_id)

            if(validate.error) {
                throw new CError(validate.error.message)
            }

            return await PostModel.findOne().populate(Parameter._USER,'-_id ' + `${Parameter.PROFILE_IMG} ${Parameter.NAME} ${Parameter.EMAIL}`).where(Parameter.POST_ID).equals(post_id).where(Parameter.VISIBLE).equals(Common.VISIBLE)
        } catch (error) {
            throw new CError(error)
        }
    }
}

export default ChatService;