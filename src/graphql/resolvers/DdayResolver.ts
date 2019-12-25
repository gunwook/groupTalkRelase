import { Arg, FieldResolver, Query, Resolver, Root, Mutation, Ctx } from "type-graphql";
import { logger } from "../../utils/logger";
import { create, update , get, getId , deleteId} from '../../components/Dday'
import DdayModel , {DListModel, IDdayModel} from '../../components/Dday/model'
import {Parameter  , Common} from '../../utils/CodeUtils'
import { Dday , DdayData , DdayItem , BaseDday , BaseDdayType} from "../schema/dday";

@Resolver(of => Dday)
export default class {
    /**
     * @description 디데이 생성
     * @param start_dt 시작 날짜
     * @param end_dt 마지막 날짜
     * @param date 날짜
     */
    @Mutation(returns => Dday , {nullable : true})
    async createDday(
        @Arg(Parameter.START_DT) start_dt : string,
        @Arg(Parameter.END_DT) end_dt : string,
        @Arg(Parameter.GROUP_ID) group_id : string,
        @Arg(Parameter.TITLE) title : string,
        @Arg(Parameter.DDAY_LIST) list : string,
        @Ctx(Parameter.USER_ID) user_id: string
        ) : Promise<DdayData> {
        try {
            let json = JSON.parse(list)
            let dday_list : DListModel[] = []
            for(let i of json) {
                let id = i["dday_model_id"]
                let title = i["dday_message"]
                let checkYn = i["check_yn"]

                let listModel : DListModel = {
                    dday_model_id : id,
                    dday_message : title,
                    check_yn : checkYn,
                    visible_yn : Common.VISIBLE
                }

                dday_list.push(listModel)
            }

            let model = new DdayModel({
                start_dt,
                end_dt ,
                group_id,
                user_id,
                title,
                dday_list,
                visible_yn : Common.VISIBLE,
                _user : user_id
            })

            let result = await create(model)
            
            return result
        } catch (error) {
            logger.error(error)
            return 
        }
    }


     /**
     * @description 디데이 수정
     * @param start_dt 시작 날짜
     * @param end_dt 마지막 날짜
     * @param date 날짜
     */
    @Mutation(returns => Dday , {nullable : true})
    async updateDday(
        @Arg(Parameter.DDAY_ID) dday_id : number,
        @Arg(Parameter.START_DT) start_dt : string,
        @Arg(Parameter.END_DT) end_dt : string,
        @Arg(Parameter.GROUP_ID) group_id : string,
        @Arg(Parameter.TITLE) title : string,
        @Arg(Parameter.DDAY_LIST) list : string,
        @Ctx(Parameter.USER_ID) user_id: string
        ) : Promise<DdayData> {
        try {
            let json = JSON.parse(list)
            let dday_list : DListModel[] = []
            for(let i of json) {
                let id = i["dday_model_id"]
                let title = i["dday_message"]
                let checkYn = i["check_yn"]

                let listModel : DListModel = {
                    dday_model_id : id,
                    dday_message : title,
                    check_yn : checkYn,
                    visible_yn : Common.VISIBLE
                }

                dday_list.push(listModel)
            }

            let model = new DdayModel({
                dday_id,
                start_dt,
                end_dt ,
                group_id,
                title,
                dday_list,
                visible_yn : Common.VISIBLE,
                _user : user_id
            })

            let result = await update(model , user_id)
            
            return result
        } catch (error) {
            logger.error(error)
            return 
        }
    }

    /**
     * @description GET 메모 리스트
     */
    @Query(returns => BaseDday , {nullable : true})
    async getDdayList(
        @Arg(Parameter.LIMIT) limit : number,
        @Arg(Parameter.OFFSET) offset : number,
        @Arg(Parameter.GROUP_ID) group_id : string
        ) : Promise<BaseDdayType>{
        try{
            return await get(limit, offset , group_id)
        }catch(error) {
            logger.error(error)
            return
        }
    }

    /**
     * @description GET 메모 ID
     */
    @Query(returns => Dday , { nullable : true})
    async getDdayId(
        @Arg(Parameter.DDAY_ID) dday_id : number
        ) : Promise<IDdayModel> {
            try {
                return await getId(dday_id)
            } catch (error) {
                logger.error(error)
                return
            }
        }

    /**
     * @description DELETE 메모 삭제
     *  */    
    @Mutation(returns => Dday , { nullable : true})
    async deleteDday(
        @Arg(Parameter.DDAY_ID) dday_id : number
    ) : Promise<IDdayModel> {
        try {
            return await deleteId(dday_id)
        } catch (error) {
            logger.error(error)
            return
        }
    }
} 