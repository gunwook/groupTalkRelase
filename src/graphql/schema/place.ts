import { Field, Int, ObjectType } from "type-graphql";


export interface PlaceData {
    lat : string;
    lon: string;
    name : string;
}

@ObjectType()
export class Place {

    @Field()
    lat : string

    @Field()
    lon : string

    @Field()
    name : string
}