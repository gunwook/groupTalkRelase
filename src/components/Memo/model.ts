import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";
import { Common } from '../../utils/CodeUtils';
import { IUser } from '../../graphql/schema/user';

export interface ResultMemoType {
    data : IMemoModel[]
    count : number
}

export interface IMemoModel extends Document {
    memo_id : number // 고유 memo id
    user_id : string // user_id
    title : string // 제목
    message : string // 내용
    date : Date // 날짜
    visible : string  // 삭제 여부 ( y : 미삭제 , n : 삭제)
    group_id : string // group_id
    _user : Schema.Types.ObjectId | IUser[]
}

/**
 * @swagger
 * components:
 *  schemas:
 *    MemoSchema:
 *      required:
 *        title:
 *        message:
 *        date:
 *        visible:
 *        user_id:
 *      properties:
 *        title:
 *          type: string
 *        message:
 *          type: string
 *        date:
 *          type: Date
 *        visible:
 *          type: string
 *        user_id:
 *          type :string
 *        group_id:
 *          type :string
 */
const MemoSchema: Schema = new Schema({
    memo_id : {type : Number , unique : true , trim : true},
    title : {type : String , required : true},
    message : {type : String , required : true},
    date : {type : Date , required : true},
    visible : {type : String , index : true , default : Common.VISIBLE},
    group_id : {type : String , required : true},
    user_id : {type : String , required : true},
    _user : [{ type : mongoose.Schema.Types.ObjectId , ref : 'UserModel'}]
}, {
    collection: 'memomodel',
    versionKey: false
})

MemoSchema.set('toObject', {
    transform: (doc : any, ret : any) => {
        delete ret._id;
        return ret;
    },
});

const options: PluginOptions = {
    field: "memo_id",
    incrementBy: 1, 
    nextCount: false, 
    resetCount: "reset",
    startAt: 1, 
    unique: true 
};


const plugin = new MongooseAutoIncrementID( MemoSchema, "MemoModel",options);
 
plugin.applyPlugin();


export default mongoose.model<IMemoModel>('MemoModel', MemoSchema);
