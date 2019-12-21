import { HttpError } from '../../config/error';
import { NextFunction, Request, Response } from 'express';
import CalendarService from './service'
import {ICalendarModel} from './model'
import CError from '../../utils/CError';

export async function createCalendar(data : ICalendarModel): Promise < ICalendarModel> {
    return await CalendarService.create(data);
}


export async function getCalendars(start_dt : string , group_id : string): Promise < ICalendarModel[]> {
    return await CalendarService.getCalendars(start_dt , group_id)
}