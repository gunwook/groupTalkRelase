import PostModel, { IPostModel, ResultPostType } from './model';


export interface IPostService {
    createPost(data : IPostModel) : Promise<IPostModel>
    getPostDetail(id : number) : Promise<IPostModel>
    getPost(groupId : string , offset : number , limit : number) :  Promise<ResultPostType>
}
