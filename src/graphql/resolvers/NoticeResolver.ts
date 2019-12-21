import { Arg, FieldResolver, Query, Resolver, Root, Mutation, Ctx } from "type-graphql";
import { logger } from "../../utils/logger";
import { create,get} from '../../components/Notice'
import {Parameter} from '../../utils/CodeUtils'
import NoticeModel from '../../components/Notice/model'
import { NoticeData, Notice, ResultNotice, NoticeResultData } from "../schema/notice";

@Resolver()
export default class {
    /**
     * @description 알림 생성
     * @param profile_img 프로필이미지
     * @param date 날짜
     * @param title 제목
     * @param content 내용
     * @param visible 보여지는지 여부
     * @param content_url 콘텐츠 내용
     * @param user_id 유저 id
     */
    @Mutation(returns => Notice , {nullable : true})
    async createNotice(
        @Arg(Parameter.PROFILE_IMG) profile_img : string,
        @Arg(Parameter.DATE) date : string,
        @Arg(Parameter.TITLE) title : string,
        @Arg(Parameter.CONTENT) content : string,
        @Arg(Parameter.VISIBLE) visible : string,
        @Arg(Parameter.CONTENT_URL) content_url : string,
        @Ctx(Parameter.USER_ID) user_id: string
        ) : Promise<NoticeData> {
        try {
         
            let model = new NoticeModel({
                profile_img,
                date ,
                title,
                content,
                visible,
                content_url,
                user_id
            })

            return await create(model)
        } catch (error) {
            logger.error(error)
            return 
        }
    }

    /**
     * @description GET 알림 리스트
     */
    @Query(returns => ResultNotice , {nullable : true})
    async getNoticeList(
        @Arg(Parameter.LIMIT) limit : number,
        @Arg(Parameter.OFFSET) offset : number,
        @Ctx(Parameter.USER_ID) userId : string
        ) : Promise<NoticeResultData>{
        try{
            return await get(userId, offset , limit)
        }catch(error) {
            logger.error(error)
            return
        }
    }
    
} 