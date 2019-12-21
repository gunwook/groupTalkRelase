import ChatModel, { IChatModel , ResultChatType } from './model';


export interface IChatService {
    createChat(data : IChatModel) : Promise<IChatModel>
    getChat(limit : number, offset : number , roomId : string) : Promise<ResultChatType>
}
