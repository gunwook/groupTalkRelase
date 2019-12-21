import {IDdayService} from './interface'
import * as Joi from 'joi';
import DdayValidation from './validation';
import DdayModel, { IDdayModel , DListModel, ResultDdayType} from './model';
import CError from '../../utils/CError';
import { Parameter , Common } from '../../utils/CodeUtils'
import { GroupType } from '../../utils/TypeUtils';
import { deleteId } from '.';
export const ChatService  : IDdayService =  {
    async create(data : IDdayModel): Promise < IDdayModel > {
        try {
            const validate: Joi.ValidationResult < IDdayModel > = DdayValidation.create(data.toObject());
            
            if (validate.error) {
                throw new CError(validate.error.message);
            }

            const saved: IDdayModel = await data.save();
            
            return saved;
        } catch (error) {
            throw new CError(error);
        }
    },
    async update(data : IDdayModel): Promise < IDdayModel > {
        try {
            const validate: Joi.ValidationResult < IDdayModel > = DdayValidation.update(data.toObject());
            
            if (validate.error) {
                throw new CError(validate.error.message);
            }

            let result = await DdayModel.updateOne({dday_id : data.dday_id} , {$set : { 
                start_dt : data.start_dt,
                end_dt : data.end_dt,
                group_id : data.group_id,
                user_id : data.user_id,
                title : data.title,
                dday_list : data.dday_list,
                visible_yn : data.visible_yn,
                _user : data.user_id
            }})

            return result
        } catch (error) {
            throw new CError(error);
        }
    },
    async get(limit : number , offset : number , group_id : string) : Promise < ResultDdayType > {
        try {
            const validate: Joi.ValidationResult < GroupType > = DdayValidation.get(group_id, offset , limit);
            
            if (validate.error) {
                throw new CError(validate.error.message);
            }

            let task = []

            task.push(
                DdayModel
                    .find()
                    .populate(Parameter._USER,'-_id ' + `${Parameter.PROFILE_IMG} ${Parameter.NAME}`)
                    .skip(offset * limit).limit(limit)
                    .where(Parameter.GROUP_ID)
                    .equals(group_id)
                    .where(Parameter.VISIBLE_YN)
                    .equals(Common.VISIBLE)    
                )

            task.push(DdayModel.countDocuments({ group_id : group_id , visible_yn : Common.VISIBLE}).exec())
    
            return Promise.all(task).then(resultArray => {
                let result : ResultDdayType = {
                    data : resultArray[0],
                    count : resultArray[1]
                }
    
                return result
            }).catch(error => {
                throw new CError(error)
            })
        }catch (error){
            throw new CError(error)
        }
    },

    async getId(id : number) {
        try {
            const validate: Joi.ValidationResult < number > = DdayValidation.checkId(id);
            
            if (validate.error) {
                throw new CError(validate.error.message);
            }

            return DdayModel
            .findOne()
            .where(Parameter.DDAY_ID)
            .equals(id)
        }catch (error){
            throw new CError(error)
        }
    },

    async deleteId(id : number) {
        try {
            const validate : Joi.ValidationResult< number> = DdayValidation.checkId(id)

            if (validate.error) {
                throw new CError(validate.error.message)
            }

            return DdayModel.updateOne({dday_id : id} , {$set : { visible_yn :  Common.INVISIBLE}})

        } catch (error) {
            throw new CError(error)
        }
    }
}

export default ChatService;