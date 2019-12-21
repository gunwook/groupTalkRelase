import DdayModel, { IDdayModel , DListModel , ResultDdayType } from './model';
import { getId } from '.';


export interface IDdayService {
    create(data : IDdayModel) : Promise<IDdayModel>
    get(limit : number , offset : number , start_dt : string) : Promise<ResultDdayType> 
    getId(dday_id : number) : Promise<IDdayModel>
    deleteId(dday_id : number) : Promise<IDdayModel>
    update(data : IDdayModel) : Promise<IDdayModel>
}
