import ChatModel, { ICalendarModel } from './model';


export interface ICalendarService {
    create(data : ICalendarModel) : Promise<ICalendarModel>
    getCalendars(start_dt : string , group_id : string) : Promise<ICalendarModel[]> 
}
