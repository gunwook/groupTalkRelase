import NoticeModel, { INoticeModel, ResultNoticeType } from './model';


export interface INoticeService {
    create(data : INoticeModel) : Promise<INoticeModel>
    get(userid : string , offset : number , limit : number) :  Promise<ResultNoticeType>
}
