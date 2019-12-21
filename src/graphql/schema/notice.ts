import { Field, Int, ObjectType } from "type-graphql";
import {Task} from "./Task";

export interface NoticeData {
    notice_id: number;
    profile_img: string;
    date : Date;
    title : string;
    content : string;
    visible : string;
    content_url : string;
    user_id : string
}

export interface NoticeResultData {
  data : NoticeData[]
  count : number
}

@ObjectType()
export class ResultNotice {
    
  @Field(type => [Notice])
  data : NoticeData[]

  @Field()
  count : number
}

@ObjectType()
export class Notice {
  @Field()
  notice_id: number;

  @Field()
  profile_img: string;

  @Field()
  date: Date;

  @Field()
  title : string;

  @Field()
  content : string;

  @Field()
  visible : string;
  
  @Field()
  content_url : string;

  @Field()
  user_id : string;
}