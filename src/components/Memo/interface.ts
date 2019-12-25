import { IMemoModel, ResultMemoType } from './model';

export interface IMemoService {
    createMemo(data : IMemoModel) : Promise<IMemoModel>
    updateMemo(data : IMemoModel , userId : string) : Promise<IMemoModel>
    getMemoList(group_id : string , limit : number  ,offset :number) : Promise<ResultMemoType>
    delMemoId(memo_id : number) : Promise<IMemoModel>
    getMemoId(memo_id : number) : Promise<IMemoModel>
}
