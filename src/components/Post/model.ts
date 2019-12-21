import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";
import { Common } from '../../utils/CodeUtils';
import { IUser } from '../../graphql/schema/user';



export interface ResultPostType {
    data : IPostModel[]
    count : number
}

export interface IPostModel extends Document {
    post_id : number // 고유 id
    image : Array<string> // image 관련 데이터 리스트
    date : Date // 저장 날짜
    message : string // 메시지
    tags : Array<string> // 카테고리
    title : string // 제목
    sub_title : string  // 부제목
    alignment : number // 정렬 (0 = 왼쪽 정렬 , 1 = 가운데 정렬 , 2 = 오른쪽 정렬)
    visible : string // 삭제 여부  ("y" = 미삭제 , "n" = 삭제) 
    user_id : string // user_id
    group_id : string // group_id ( socket_id 동일 )
    _user : Schema.Types.ObjectId | IUser[]
}

/**
 * @swagger
 * components:
 *  schemas:
 *    PostSchema:
 *      required:
 *        date:
 *        message:
 *        title:
 *        user_id:
 *        group_id:
 *      properties:
 *        image:
 *          type: Array<string>
 *        date:
 *          type: Date
 *        message:
 *          type: string
 *        tags:
 *          type: Array<string>
 *        title:
 *          type : string
 *        sub_title:
 *          type : string
 *        alignment:
 *          type : number
 *        visible:
 *          type : string
 *        user_id:
 *          type : string
 *        group_id:
 *          type : string
 */
const PostSchema: Schema = new Schema({
    post_id : {type : Number , unique : true , trim : true},
    image : {type : Array},
    date : {type : Date , required : true},
    message : {type : String , required : true},
    tags : {type : Array , index : true},
    title : {type : String , required : true },
    sub_title : { type : String},
    alignment : {type : Number , default : 0},
    visible : {type : String , default : Common.VISIBLE},
    user_id : {type : String , required : true},
    group_id : { type : String , required : true},
    _user : [{ type : mongoose.Schema.Types.ObjectId , ref : 'UserModel'}]
}, {
    collection: 'postmodel',
    versionKey: false
})

PostSchema.set('toObject', {
    transform: (doc : any, ret : any) => {
        delete ret._id;
        return ret;
    },
});

const options: PluginOptions = {
    field: "post_id",
    incrementBy: 1, 
    nextCount: false, 
    resetCount: "reset",
    startAt: 1, 
    unique: true 
};


const plugin = new MongooseAutoIncrementID( PostSchema, "PostModel",options);
 
plugin.applyPlugin();


export default mongoose.model<IPostModel>('PostModel', PostSchema);
