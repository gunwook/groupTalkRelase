import { Arg ,Ctx, FieldResolver, Query, Resolver, Root, Mutation } from "type-graphql";
import { logger } from "../../utils/logger";
import { Post , PostData ,ResultPost , ResultPostData} from "../schema/post";
import {createPost  , getPost , getPostId} from '../../components/Post'
import PostModel from '../../components/Post/model'
import {Parameter, Common} from '../../utils/CodeUtils'
import { string } from "joi";

@Resolver(of => Post)
export default class {

    /**
     * @description 이야기 생성
     * @param image 이미지 리스트
     * @param date 날짜
     * @param message 메시지
     * @param tags 태그 리스트
     * @param title 제목
     * @param sub_title 부제목
     * @param alignment 정렬
     */
    @Mutation(returns => Post , {nullable : true})
    async createPost(
     
        @Arg(Parameter.DATE) date : string,
        @Arg(Parameter.MESSAGE) message : string,
        @Arg(Parameter.TITLE) title : string,
        @Arg(Parameter.SUB_TITLE) sub_title : string,
        @Arg(Parameter.ALIGNMENT) alignment : number,
        @Arg(Parameter.GROUP_ID) group_id : string,
        @Ctx(Parameter.USER_ID) user_id: string,
        @Arg(Parameter.IMAGE , type => [String] , { nullable : true}) image?: string[],
        @Arg(Parameter.TAGS , type => [String] , { nullable : true}) tags?: string[]
        ) : Promise<PostData> {
        try {
            let model = new PostModel({
                image,
                date,
                message,
                tags,
                title,
                sub_title,
                alignment,
                group_id,
                _user : user_id
            })
            let response = await createPost(model)

            return response
        } catch (error) {
            logger.error(error)
            return 
        }
    }



    /**
     * @description 이야기 가져오기
     * @param limit 제한 페이지 수
     * @param offset 제한 페이지
     * @param user_id user_id
     * @param group_id group_id (socket_id)
     */
    @Query(returns => ResultPost , {nullable : true})
    async getPost(
        @Arg(Parameter.LIMIT) limit : number,
        @Arg(Parameter.OFFSET) offset : number,
        @Arg(Parameter.GROUP_ID) group_id : string
    ) : Promise<ResultPostData> {
        try {
            return await getPost(group_id, offset, limit)
        } catch (error) {
            logger.error(error)
        }
    }


    /**
     * @description 이야기 상세 가져오기
     */
    @Query(returns => Post , { nullable : true})
    async getPostId(
        @Arg(Parameter.POST_ID) post_id : number
    ) : Promise<PostData> {
        try{
            return await getPostId(post_id)
        }catch(error) {
            logger.error(error)
        }
    }

} 