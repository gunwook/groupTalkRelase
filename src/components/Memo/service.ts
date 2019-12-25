import {IMemoService} from './interface'
import * as Joi from 'joi';
import MemoValidation from './validation';
import MemoModel, { IMemoModel , ResultMemoType } from './model';
import CError from '../../utils/CError';
import { Parameter, Common } from '../../utils/CodeUtils';
import { UserType } from '../../utils/TypeUtils';
import { logger } from '../../utils/logger';
export const MemoService  : IMemoService =  {
    async createMemo(data : IMemoModel): Promise < IMemoModel > {
        try {
            const validate: Joi.ValidationResult < IMemoModel > = MemoValidation.createMemo(data.toObject());
            
            if (validate.error) {
                throw new CError(validate.error.message);
            }
           
            const saved: IMemoModel = await data.save();

            return saved;
        } catch (error) {
            throw new CError(error);
        }
    },

    async updateMemo(data : IMemoModel , userId : string): Promise < IMemoModel > {
        try {
            const validate: Joi.ValidationResult < IMemoModel > = MemoValidation.updateMemo(data.toObject());
            
            if (validate.error) {
                throw new CError(validate.error.message);
            }
           

            let result = await MemoModel.updateOne({memo_id : data.memo_id} , {$set : { 
                title : data.title,
                message : data.message,
                date : data.date,
                visible : data.visible,
                group_id : data.group_id,
                _user : userId
            }})
            
            return result
        } catch (error) {
            throw new CError(error);
        }
    },

    async getMemoList(group_id : string , limit : number , offset : number) : Promise <ResultMemoType> {

        const validate: Joi.ValidationResult < UserType > = MemoValidation.getMemo(limit,offset);
            
        if (validate.error) {
            throw new CError(validate.error.message);
        }

        let task = []

        task.push(MemoModel.find().populate(Parameter._USER,'-_id ' + `${Parameter.PROFILE_IMG} ${Parameter.NAME}`).skip(offset * limit).limit(limit).where(Parameter.GROUP_ID).equals(group_id)
            .where(Parameter.VISIBLE)
            .equals(Common.VISIBLE)
        )
        task.push(MemoModel.countDocuments({ group_id : group_id , visible : Common.VISIBLE}).exec())

        return Promise.all(task).then(resultArray => {
            let result : ResultMemoType = {
                data : resultArray[0],
                count : resultArray[1]
            }

            return result
        }).catch(error => {
            throw new CError(error)
        })
    },

    async delMemoId(memo_id :number) : Promise<IMemoModel> {
        try {
            const validate: Joi.ValidationResult < number > = MemoValidation.checkMemoId(memo_id);
            
            if (validate.error) {
                throw new CError(validate.error.message);
            }

            return MemoModel
            .updateOne({
                memo_id : memo_id
            }, {
                $set : {
                    visible : Common.INVISIBLE
                }
            })
        } catch (error) {
            throw new CError(error);
        }
    },

    async getMemoId(memo_id : number) : Promise<IMemoModel> {
        try {
            const validate: Joi.ValidationResult < number > = MemoValidation.checkMemoId(memo_id);
            
            if (validate.error) {
                throw new CError(validate.error.message);
            }

            return MemoModel.findOne()
                .where(Parameter.MEMO_ID)
                .equals(memo_id)
                .where(Parameter.VISIBLE)
                .equals(Common.VISIBLE)
        } catch (error) {
            throw new CError(error)
        }
    }
}

export default MemoService;