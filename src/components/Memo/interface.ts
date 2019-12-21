import { IMemoModel, ResultMemoType } from './model';

export interface IMemoService {
    createMemo(data : IMemoModel) : Promise<IMemoModel>
    updateMemo(data : IMemoModel) : Promise<IMemoModel>
    getMemoList(group_id : string , user_id : string , limit : number  ,offset :number) : Promise<ResultMemoType>
    delMemoId(memo_id : number) : Promise<IMemoModel>
    getMemoId(memo_id : number) : Promise<IMemoModel>
}
