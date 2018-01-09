import { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import nodeInterface from '../node';
import * as db from '../databaseAdapter';

export const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "the root query",
    type: nodeInterface,
    fields: {
        node: {
            type: nodeInterface,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                }
            },
            resolve(source,args) {
                return db.getData(db.nodeIdToDbId(args.id)).then((data)=>{
                    return data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
        }
    }
});