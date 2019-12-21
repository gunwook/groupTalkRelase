import {INoticeService} from './interface'
import * as Joi from 'joi';
import NoticeValidation from './validation';
import NoticeModel, { INoticeModel, ResultNoticeType } from './model';
import CError from '../../utils/CError';
import { Parameter } from '../../utils/CodeUtils';
import { UserType } from '../../utils/TypeUtils';
export const NoticeService  : INoticeService =  {
    async create(data : INoticeModel): Promise < INoticeModel > {
        try {
            const validate: Joi.ValidationResult < INoticeModel > = NoticeValidation.create(data.toObject());
            
            if (validate.error) {
                throw new CError(validate.error.message);
            }
           
            const saved: INoticeModel = await data.save();

            return saved;
        } catch (error) {
            throw new CError(error);
        }
    },
    async get(userid : string , offset : number , limit : number ) : Promise <ResultNoticeType> {

        const validate : Joi.ValidationResult<UserType> = NoticeValidation.get(userid,offset,limit)

        if(validate.error) {
            throw new CError(validate.error.message)
        }

        let task = []

        task.push(NoticeModel.find().skip(offset * limit).limit(limit).where(Parameter.USER_ID).equals(userid))
        task.push(NoticeModel.countDocuments({ user_id : userid}).exec())

        return Promise.all(task).then(resultArray => {
            let result : ResultNoticeType = {
                data : resultArray[0],
                count : resultArray[1]
            }

            return result
        }).catch(error => {
            throw new CError(error)
        })
    }
}

export default NoticeService;