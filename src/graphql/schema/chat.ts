import { Field, Int, ObjectType } from "type-graphql";

export interface ResultChatData {
    data : ChatData[]
    count : number
}


export interface ChatData {
    chat_id: number, // 고유 ID 
    message : string, // 채팅 메시지
    date : Date, // 날짜
    email : string, // 이메일
    room_id : string // room_id
    name : string // usesr 이름
    image : string  //image
    profile_img : string // 프로필 이미지
}

@ObjectType()
export class Chat {
    @Field()
    chat_id : number

    @Field()
    message : string

    @Field()
    date : Date

    @Field()
    email : string

    @Field()
    room_id : string

    @Field()
    name : string

    @Field()
    image : string

    @Field()
    profile_img : string
}


@ObjectType()
export class ResultChat {
  
  @Field(type => [Chat])
  data : ChatData[]

  @Field()
  count : number
}