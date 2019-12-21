import { Arg, FieldResolver, Query, Resolver, Root, Mutation } from "type-graphql";
import { logger } from "../../utils/logger";
import { Chat , ChatData , ResultChatData ,ResultChat} from "../schema/chat";
import {getChat, createChat} from '../../components/Chat'
import CalendarModel from '../../components/Calendar/model'
import {Parameter} from '../../utils/CodeUtils'

@Resolver(of => Chat)
export default class {

    /**
     * @description 해당 RoomId에 속하는 채팅 가져오기
     * @param limit 제한 갯수
     * @param offset 해당 페이지
     * @param room_id RoomId
     */
    @Query(returns => ResultChat , {nullable : true})
    async getChat(
        @Arg(Parameter.LIMIT) limit : number,
        @Arg(Parameter.OFFSET) offset : number,
        @Arg(Parameter.ROOM_ID) room_id : string) : Promise<ResultChatData> {
        try {
            return  await getChat(limit, offset ,room_id)
        } catch (error) {
            logger.error(error)
            return 
        }
    }
} 