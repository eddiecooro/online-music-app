import { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import {NodeInterface} from '../types';
import * as db from '../databaseAdapter';

export const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "the root query",
    fields: {
        node: {
            type: NodeInterface,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                }
            },
            resolve(source,args) {
                return db.getData(...db.nodeIdToDbId(args.id)).then((data)=>{
                    // console.log(data);
                    return data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
        }
    }
});
// export const RootQuery = new GraphQLObjectType({
//     name: "Hello",
//     fields: {
//         node: {
//             type: GraphQLString,
//             resolve(){
//                 return "Hello"
//             }
//         }
//     }
// })