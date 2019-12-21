import { Field, Int, ObjectType } from "type-graphql";
import {Task} from "./Task";

export interface MovieData {
    rank: string;
    movieNm: string;
    openDt : string;
}

@ObjectType()
export class Movie {
  @Field()
  rank: String;

  @Field()
  movieNm: string;

  @Field()
  openDt: string;
}