import * as bcrypt from 'bcrypt';
import * as connections from '../../config/db/connection';
import * as crypto from 'crypto';
import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";
import { string } from 'joi';
import { IUser } from '../../graphql/schema/user';

export interface ResultDdayType {
    data : IDdayModel[]
    count : number
}


export type DListModel = {
    dday_model_id : string,
    dday_message : string,
    check_yn : string,
    visible_yn : string
}

export interface IDdayModel extends Document { 
    dday_id : number // 고유 ID
    start_dt : Date  // 시작날짜
    end_dt : Date // 마지막날짜
    group_id : string   // 그룹 id 
    title : string // title
    dday_list : DListModel[] // model list
    visible_yn : string // 표시 여부
    _user : Schema.Types.ObjectId | IUser[]
}

/**
 * @swagger
 * components:
 *  schemas:
 *    DdaySchema:
 *      required:
 *        - start_dt
 *        - title
 *      properties:
 *        dday_id:
 *          type: number
 *        start_dt:
 *          type: string
 *        end_dt:
 *          type: string
 *        group_id: 
 *          type : string
 *        dday_list : 
 *          type : Array
 *        title :
 *          type : string
 *        visible_yn :
 *          type : string
 */
const DdaySchema : Schema = new Schema({
    dday_id: {type : Number , unique : true},
    start_dt : {type : Date , required : true},
    end_dt : {type : Date , required : true} ,
    group_id : {type : String , required : true , index : true},
    title : {type  : String , required : true},
    dday_list : {type : Array},
    visible_yn : {type : String},
    _user : [{ type : mongoose.Schema.Types.ObjectId , ref : 'UserModel'}]
}, {
    collection: 'dday',
    versionKey: false
})

DdaySchema.set('toObject', {
    transform: (doc : any, ret : any) => {
        delete ret._id;
        return ret;
    },
});

const options: PluginOptions = {
    field: "dday_id",
    incrementBy: 1, 
    nextCount: false, 
    resetCount: "reset",
    startAt: 1, 
    unique: true 
};


const plugin = new MongooseAutoIncrementID( DdaySchema, "DdayModel",options);
 
plugin.applyPlugin();

export default mongoose.model<IDdayModel>('DdayModel', DdaySchema);
