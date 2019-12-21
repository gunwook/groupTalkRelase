import { Field, Int, ObjectType } from "type-graphql";
import {Project} from "./Project";

export interface TaskData {
    id: number;
    title: string;
    completed: boolean;
    project_id: number;
} 

@ObjectType()
export class Task {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field(type => Project)
  project: Project;

  @Field()
  completed: boolean;
}