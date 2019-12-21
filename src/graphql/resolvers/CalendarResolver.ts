import { Arg, FieldResolver, Query, Resolver, Root, Mutation } from "type-graphql";
import { logger } from "../../utils/logger";
import { Calendar , CalendarData } from "../schema/calendar";
import {createCalendar , getCalendars} from '../../components/Calendar'
import CalendarModel from '../../components/Calendar/model'
import {Parameter} from '../../utils/CodeUtils'

@Resolver(of => Calendar)
export default class {

    /**
     * @description 캘린더 아이템 생성
     * @param start_dt 시작 날짜
     * @param end_dt 마지막 날짜
     * @param message 메시지
     * @param check_yn 체크 여부
     * @param type 타입
     */
    @Mutation(returns => Calendar , {nullable : true})
    async createCalendar(
        @Arg(Parameter.START_DT) start_dt : string,
        @Arg(Parameter.END_DT) end_dt : string,
        @Arg(Parameter.MESSAGE) message : string,
        @Arg(Parameter.CHECK_YN) check_yn : string,
        @Arg(Parameter.TYPE) type : number , 
        @Arg(Parameter.GROUP_ID) group_id : string) : Promise<CalendarData> {
        try {
            let model = new CalendarModel({
                start_dt : start_dt,
                end_dt : end_dt ,
                message : message,
                check_yn : check_yn,
                type : type,
                group_id : group_id
            })

            return await createCalendar(model)
        } catch (error) {
            logger.error(error)
            return 
        }
    }


    /**
     * @description 캘린더 해당 날짜 얻기
     * @param start_dt 시작 날짜
     */
    @Query(returns => [Calendar] , {nullable : true})
    async getCalendars(@Arg(Parameter.START_DT) start_dt : string ,  @Arg(Parameter.GROUP_ID)  group_id : string) : Promise<CalendarData[]> {
        try {
            return await getCalendars(start_dt , group_id)
        } catch (error) {
            logger.error(error)
            return
        }
    }
} 