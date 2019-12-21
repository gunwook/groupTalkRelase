import { Field, Int, ObjectType } from "type-graphql";

export interface CalendarData {
    calendar_id : number
    start_dt: Date
    end_dt : Date
    message : string
    check_yn : string
    type : number
    group_id : string
}

@ObjectType()
export class Calendar {

    @Field()
    calendar_id : number

    @Field()
    start_dt : Date

    @Field()
    end_dt : Date

    @Field()
    message : string

    @Field()
    check_yn : string

    @Field()
    type : number

    @Field()
    group_id : string
}