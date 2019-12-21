import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";
import { Common } from '../../utils/CodeUtils';

export interface ResultNoticeType {
    data : INoticeModel[]
    count : number
}

export interface INoticeModel extends Document {
    notice_id : number // notice_id
    profile_img : string // 프로필 이미지
    date : Date // 날짜
    title : string // 제목
    content : string // 내용
    visible : string // 보여지는지 여부
    content_url : string // 이동 URL
    user_id : string // id
}

/**
 * @swagger
 * components:
 *  schemas:
 *    PostSchema:
 *      required:
 *        notice_id:
 *        date:
 *        title:
 *        content:
 *        visible:
 *        user_id:
 *      properties:
 *        notice_id:
 *          type: number
 *        profile_img:
 *          type: string
 *        date:
 *          type: Date
 *        title:
 *          type : string
 *        content:
 *          type: string
 *        visible:
 *          type : string
 *        content_url:
 *          type : string
 *        user_id:
 *          type : string
 */

const NoticeSchema: Schema = new Schema({
    notice_id : {type : Number , unique : true , trim : true},
    profile_img : {type : String},
    date : { type : Date, required: true},
    title : {type: String , required : true},
    content : { type : String , required : true},
    visible : { type : String , required : true , default : Common.VISIBLE},
    content_url : {type : String},
    user_id : {type : String , required : true}
}, {
    collection: 'noticemodel',
    versionKey: false
})

NoticeSchema.set('toObject', {
    transform: (doc : any, ret : any) => {
        delete ret._id;
        return ret;
    },
});

const options: PluginOptions = {
    field: "notice_id",
    incrementBy: 1, 
    nextCount: false, 
    resetCount: "reset",
    startAt: 1, 
    unique: true 
};


const plugin = new MongooseAutoIncrementID( NoticeSchema, "NoticeModel",options);
 
plugin.applyPlugin();


export default mongoose.model<INoticeModel>('NoticeModel', NoticeSchema);
