import { Arg, FieldResolver, Query, Resolver, Root, Mutation, Ctx } from "type-graphql";
import { logger } from "../../utils/logger";
import {createMemo ,getMemoList , updateMemo , deleteMemoId , getMemoId} from '../../components/Memo'
import MemoModel from '../../components/Memo/model'
import {Parameter} from '../../utils/CodeUtils'
import { Memo , MemoData, MemoResultData, ResultMemo} from "../schema/memo";

@Resolver(of => Memo)
export default class {
    /**
     * @description 메모 아이템 생성
     * @param title 제목
     * @param message 내용
     * @param date 날짜
     */
    @Mutation(returns => Memo , {nullable : true})
    async createMemo(
        @Arg(Parameter.TITLE) title : string,
        @Arg(Parameter.MESSAGE) message : string,
        @Arg(Parameter.DATE) date : string,
        @Arg(Parameter.GROUP_ID) group_id : string,
        @Ctx(Parameter.USER_ID) user_id: string
        ) : Promise<MemoData> {
        try {
            let model = new MemoModel({
                title,
                message ,
                date,
                group_id,
                user_id,
                _user : user_id
            })

            return await createMemo(model)
        } catch (error) {
            logger.error(error)
            return 
        }
    }
    

    /**
     * @description 메모 아이템 업데이트
     * @param memo_id 메모 Id
     * @param title 제목
     * @param message 내용
     * @param date 날짜
     * @param group_id 그룹 ID
     * @param user_id 유저 ID
     */
    @Mutation(returns => Memo , {nullable : true})
    async updateMemo(
        @Arg(Parameter.MEMO_ID) memo_id : number,
        @Arg(Parameter.TITLE) title : string,
        @Arg(Parameter.MESSAGE) message : string,
        @Arg(Parameter.DATE) date : string,
        @Arg(Parameter.GROUP_ID) group_id : string,
        @Ctx(Parameter.USER_ID) user_id: string
        ) : Promise<MemoData> {
        try {
            let model = new MemoModel({
                memo_id,
                title,
                message ,
                date,
                group_id,
                _user : user_id
            })

            return await updateMemo(model , user_id)
        } catch (error) {
            logger.error(error)
            return 
        }
    }

    /**
     * @description GET 메모 리스트
     */
    @Query(returns => ResultMemo , {nullable : true})
    async getMemoList(
        @Arg(Parameter.LIMIT) limit : number,
        @Arg(Parameter.OFFSET) offset : number,
        @Arg(Parameter.GROUP_ID) group_id : string,
        @Ctx(Parameter.USER_ID) user_id: string
        ) : Promise<MemoResultData>{
        try{
            return await getMemoList(group_id,limit,offset)
        }catch(error) {
            logger.error(error)
            return
        }
    }


    /**
     * @description GET 메모 id
     */
    @Query(returns => Memo , {nullable : true})
    async getMemoId(
        @Arg(Parameter.MEMO_ID) memo_id : number
    ) : Promise <MemoData> {
        try {
            return await getMemoId(memo_id)
        } catch (error) {
            logger.error(error)
            return
        }
    }

    /**
     * @description DELETE 메모 ID
     */
    @Mutation(returns => Memo , {nullable : true})
    async delMemoId(
        @Arg(Parameter.MEMO_ID) memo_id : number
    ) : Promise <MemoData> {
        try {
            return await deleteMemoId(memo_id)         
        } catch (error) {
            logger.error(error)
            return
        }
    }
} 