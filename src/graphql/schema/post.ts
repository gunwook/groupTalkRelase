import { Field, Int, ObjectType } from "type-graphql";
import { Schema } from "mongoose";
import { IUser, User } from "./user";

export interface ResultPostData {
    data : PostData[]
    count : number
}

export interface PostData {
    image : string[],
    date : Date,
    message : string,
    tags : string[],
    title : string,
    sub_title : string,
    alignment : number,
    post_id : number,
    _user : Schema.Types.ObjectId | IUser[]
}

@ObjectType()
export class Post {
    @Field(type => [String] , {nullable : true})
    image ?: string[]

    @Field()
    date : Date

    @Field()
    message : string

    @Field(type => [String] , {nullable : true})
    tags ?: string[]

    @Field()
    title : string

    @Field()
    sub_title : string

    @Field()
    alignment : number

    @Field()
    post_id : number

    
    @Field(type => [User])
    _user : IUser[]
}


@ObjectType()
export class ResultPost {
    @Field(type => [Post])
    data : PostData[]

    @Field()
    count : number
}