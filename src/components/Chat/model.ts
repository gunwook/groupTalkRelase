import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";

export interface ResultChatType {
    data : IChatModel[]
    count : number
}


export interface IChatModel extends Document {
    chat_id: number // 고유 ID 
    message : string // 채팅 메시지
    date : Date // 날짜
    email : string // 이메일
    room_id : string // room_id
    name : string // user name
    image : string // imageUrl
    profile_img : string // profile img
}

/**
 * @swagger
 * components:
 *  schemas:
 *    ChatSchema:
 *      required:
 *        - message
 *        - email
 *        - room_id
 *        - name
 *      properties:
 *        chat_id:
 *          type: number
 *        message:
 *          type: string
 *        date:
 *          type: Date
 *        email:
 *          type: string
 *        room_id:
 *          type: string
 *        name:
 *          type : string
 *        image :
 *          type : string
 *        profile_img:
 *          type : string
 */
const ChatSchema: Schema = new Schema({
    chat_id: {type : Number , unique : true},
    message : {type : String , required : false},
    date : {type : Date},
    email : {type : String , required : true},
    room_id : {type : String , required : true},
    name : {type : String , required : true},
    image : {type : String , required: false},
    profile_img : {type : String , required : true}
}, {
    collection: 'chatmodel',
    versionKey: false
})

ChatSchema.set('toObject', {
    transform: (doc : any, ret : any) => {
        delete ret._id;
        return ret;
    },
});

const options: PluginOptions = {
    field: "chat_id",
    incrementBy: 1, 
    nextCount: false, 
    resetCount: "reset",
    startAt: 1, 
    unique: true 
};


const plugin = new MongooseAutoIncrementID( ChatSchema, "ChatModel",options);
 
plugin.applyPlugin();


export default mongoose.model<IChatModel>('ChatModel', ChatSchema);
