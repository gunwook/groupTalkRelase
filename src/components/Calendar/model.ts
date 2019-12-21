import * as bcrypt from 'bcrypt';
import * as connections from '../../config/db/connection';
import * as crypto from 'crypto';
import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";

export interface ICalendarModel extends Document {
    calendar_id: number // 고유 ID
    start_dt : Date // 시작 날짜
    end_dt : Date // 마지막 날짜
    message : string // 메시지
    check_yn : string // 체크 여부
    type : number // Calendar Item Type
    group_id : string // group_id
}

/**
 * @swagger
 * components:
 *  schemas:
 *    CalendarSchema:
 *      required:
 *        - start_dt
 *        - message
 *        - group_id
 *      properties:
 *        calendar_id:
 *          type: number
 *        start_dt:
 *          type: Date
 *        end_dt:
 *          type: Date
 *        message:
 *          type: string
 *        check_yn:
 *          type: string
 *        type:
 *          type: number
 */
const CalendarSchema : Schema = new Schema({
    calendar_id: {type : Number , unique : true},
    start_dt : {type : Date , required : true},
    end_dt : {type : Date } ,
    message : {type : String , required : true},
    check_yn : {type : String , required : true},
    type : {type : Number , required :true},
    group_id : {type : String , required : true}
}, {
    collection: 'calendar',
    versionKey: false
})

CalendarSchema.set('toObject', {
    transform: (doc : any, ret : any) => {
        delete ret._id;
        return ret;
    },
});

const options: PluginOptions = {
    field: "calendar_id",
    incrementBy: 1, 
    nextCount: false, 
    resetCount: "reset",
    startAt: 1, 
    unique: true 
};


const plugin = new MongooseAutoIncrementID( CalendarSchema, "CalendarModel",options);
 
plugin.applyPlugin();


export default mongoose.model<ICalendarModel>('CalendarModel', CalendarSchema);
