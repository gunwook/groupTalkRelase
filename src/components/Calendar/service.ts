import * as Joi from 'joi';
import CalendarValidation from './validation';
import CalendarModel, { ICalendarModel } from './model';
import { ICalendarService } from './interface';
import { getSocketRoom } from '../../utils/CommonUtils'
import CError from '../../utils/CError';
import {Parameter} from '../../utils/CodeUtils'

const CalendarService: ICalendarService = {

    
    async create(body : ICalendarModel ): Promise < ICalendarModel > {
        try {
            const validate: Joi.ValidationResult < ICalendarModel > = CalendarValidation.create(body.toObject())

            if (validate.error) {
                throw new CError(validate.error.message);
            }
            const saved: ICalendarModel = await body.save();

            return saved;
        } catch (error) {
            throw new CError(error);
        }
    },


    async getCalendars(start_dt : string , group_id : string) : Promise<ICalendarModel[]> {
        try {
            let date = new Date(start_dt)
            date.setUTCHours(0,0,0,0)

            return await CalendarModel.find({
                $and: [
                    { group_id },
                    { start_dt : {$lte : date}},
                    { end_dt : {$gte : date}}
                ]
            })
        } catch (error) {
            throw new CError(error)
        }
    } 
    
};

export default CalendarService;
