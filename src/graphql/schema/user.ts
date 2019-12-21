import { Field, Int, ObjectType } from "type-graphql";
import { Schema } from "mongoose";


export interface IUser {
    profile_img : string // 프로필 이미지
    name : string // 이름
    email: string
}

@ObjectType()
export class User {
    @Field()
    profile_img : string

    @Field()
    name : string

    @Field()
    email : string
    
}