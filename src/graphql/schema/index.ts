import "reflect-metadata";
import { GraphQLSchema, printSchema } from 'graphql';
import { buildSchema } from "type-graphql";
import PlaceSearchResolver from "../resolvers/PlaceSearchResolver";
import CalendarResolver from '../resolvers/CalendarResolver'
import PostResolver from '../resolvers/PostResolver'
import ChatResolver from '../resolvers/ChatResolver'
import MemoResolver from '../resolvers/MemoResolver'
import NoticeResolver from '../resolvers/NoticeResolver'
import DdayResolver from '../resolvers/DdayResolver'
export async function getSchemas() {
    const schema = await buildSchema({ 
        resolvers: [
            PlaceSearchResolver,
            CalendarResolver,
            PostResolver,
            ChatResolver, 
            MemoResolver,
            NoticeResolver,
            DdayResolver
        ],
        emitSchemaFile: true,
    })

    return schema
}