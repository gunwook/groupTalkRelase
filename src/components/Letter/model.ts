import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";
import { Common } from '../../utils/CodeUtils';



export interface ILetterModel extends Document {
    letter_id : number, // 고유 id
    send_nm : string, // 보내는 사람
    receive_nm : string, // 받는 사람
    receive_time : Date, // 받는  시간
    send_time : Date, // 보내는 시간
    image : string, // 대표 이미지
    title : string, // 제목
    message : string, // 내용
    letter_type : string // 편지 타입 설정
    receive_email : string // 받는 사람 이메일 (key)
    visible : string // 삭제 여부 ( y : 미삭제 , n : 삭제 )
}

/**
 * @swagger
 * components:
 *  schemas:
 *    LetterSchema:
 *      required:
 *        send_nm:
 *        receive_nm:
 *        image:
 *        title:
 *        message:
 *        letter_type:
 *        receive_time:
 *        send_time:
 *        receive_email:
 *        visible:
 *      properties:
 *        send_nm:
 *          type: string
 *        receive_nm:
 *          type: Date
 *        image:
 *          type: string
 *        title:
 *          type: string
 *        message:
 *          type: string
 *        letter_type:
 *          type: string
 *        receive_time:
 *          type: string
 *        send_time:
 *          type: string
 *        receive_email:
 *          type : string
 *        visible:
 *          type : string
 */
const LetterSchema: Schema = new Schema({
    letter_id : {type : Number , unique : true , trim : true},
    send_nm : {type : String , required : true},
    receive_nm : {type : String , required : true},
    receive_time : {type : Date , required : true},
    send_time : {type : Date , required : true},
    image : {type : String , required : true},
    title : {type : String, required : true },
    message : {type : String, required : true },
    letter_type : {type : String, required : true },
    receive_email : {type : String , required : true , index : true},
    visible : {type : String , default : Common.VISIBLE}
}, {
    collection: 'lettermodel',
    versionKey: false
})

LetterSchema.set('toObject', {
    transform: (doc : any, ret : any) => {
        delete ret._id;
        return ret;
    },
});

const options: PluginOptions = {
    field: "letter_id",
    incrementBy: 1, 
    nextCount: false, 
    resetCount: "reset",
    startAt: 1, 
    unique: true 
};


const plugin = new MongooseAutoIncrementID( LetterSchema, "LetterModel",options);
 
plugin.applyPlugin();


export default mongoose.model<ILetterModel>('LetterModel', LetterSchema);
