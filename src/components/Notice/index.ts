import NoticeService from './service'
import {INoticeModel , ResultNoticeType} from './model'

export async function create(data : INoticeModel): Promise < INoticeModel > {
    const post = await NoticeService.create(data);
    return post
}

export async function get(userId : string , offset : number , limit : number) : Promise < ResultNoticeType>  {
    const post = await NoticeService.get(userId , offset , limit)
    return post
}