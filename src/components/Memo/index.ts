import MemoService from './service'
import {IMemoModel, ResultMemoType} from './model'

export async function createMemo(data : IMemoModel): Promise < IMemoModel > {
    return await MemoService.createMemo(data);
}

export async function updateMemo(data : IMemoModel , userId : string) : Promise < IMemoModel > {
    return await MemoService.updateMemo(data , userId)
} 

export async function getMemoList(group_id : string , limit : number , offset : number): Promise < ResultMemoType > {
    return await MemoService.getMemoList(group_id,limit,offset);
}

export async function getMemoId(memo_id : number) : Promise <IMemoModel> {
    return await MemoService.getMemoId(memo_id)
} 

export async function deleteMemoId(memo_id : number) : Promise <IMemoModel> {
    return await MemoService.delMemoId(memo_id)
}