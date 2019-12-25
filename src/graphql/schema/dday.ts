import { Field, Int, ObjectType } from "type-graphql";
import {Task} from "./Task";
import { IDdayModel, DListModel } from "../../components/Dday/model";
import { Schema } from "mongoose";
import { IUser, User } from "./user";

export interface DdayData {
  dday_id : number // 고유 ID
  start_dt : Date  // 시작날짜
  end_dt : Date // 마지막날짜
  group_id : string   // 그룹 id 
  title : string // title
  dday_list : DListModel[] // model list
  visible_yn : string // 표시 여부
  _user : Schema.Types.ObjectId | IUser[]
}

export interface BaseDdayType {
  data : IDdayModel[]
  count : number
}
@ObjectType()
export class Dday {
  @Field()
  start_dt: Date;

  @Field()
  end_dt: Date;

  @Field()
  group_id: string;

  @Field()
  title : string;

  @Field()
  dday_id : number;

  @Field(type => [DdayItem])
  dday_list : DListModel[]

  @Field()
  visible_yn : string;

  @Field(type => [User])
  _user : IUser[]
}

@ObjectType()
export class BaseDday {
  
  @Field(type => [Dday])
  data : DdayData[]

  @Field()
  count : number
}


@ObjectType()
export class DdayItem {
  @Field()
  dday_model_id : string;

  @Field()
  dday_message : string;

  @Field()
  check_yn :string;

  @Field()
  visible_yn : string
}