import {IChatService} from './interface'
import * as Joi from 'joi';
import ChatValidation from './validation';
import ChatModel, { IChatModel , ResultChatType } from './model';
import CError from '../../utils/CError';
import { Parameter } from '../../utils/CodeUtils'
export const ChatService  : IChatService =  {
    async createChat(data : IChatModel): Promise < IChatModel > {
        try {
            const validate: Joi.ValidationResult < IChatModel > = ChatValidation.createChat(data.toObject());
            
            if (validate.error) {
                throw new CError(validate.error.message);
            }

            const saved: IChatModel = await data.save();

            return saved;
        } catch (error) {
            throw new CError(error);
        }
    },

    async getChat(limit : number , offset: number , roomId : string) : Promise < ResultChatType> {
        try {
            const validate: Joi.ValidationResult < string > = ChatValidation.getChat(roomId);
            
            if (validate.error) {
                throw new CError(validate.error.message);
            }
            
            let task = []

            task.push(
                ChatModel
                .find()
                .skip(offset * limit).limit(limit)
                .where(Parameter.ROOM_ID)
                .equals(roomId))

            task.push(ChatModel.countDocuments({ room_id : roomId}).exec())
    
            return Promise.all(task).then(resultArray => {
                let result : ResultChatType = {
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
    }
}

export default ChatService;