import { Field, Int, ObjectType } from "type-graphql";
import { Schema } from "mongoose";
import { User, IUser} from "./user";
import { UserType } from "../../utils/TypeUtils";


export interface MemoData {
    title : string // 제목
    message : string // 내용
    date : Date // 날짜
    memo_id : number
    group_id : string
    _user : Schema.Types.ObjectId | IUser[]
}

export interface MemoResultData {
    data : MemoData[]
    count : number
}


@ObjectType()
export class Memo {
    @Field()
    title : string

    @Field()
    message : string

    @Field()
    memo_id : number

    @Field()
    date : Date

    @Field()
    group_id : string

    @Field(type => [User])
    _user : IUser[]
}


@ObjectType()
export class ResultMemo {
    @Field(type => [Memo])
    data : MemoData[]

    @Field()
    count : number
}