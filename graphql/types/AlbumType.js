import {nodeInterface} from '../node'
import *  as db from '../databaseAdapter'
import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} from 'graphql'


export const AlbumType = new  GraphQLObjectType({
    name:"Album",
    interfaces:[nodeInterface],
    fields:{
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (source, args, context)=>{
                return db.dbIdToNodeId(source.__modelName, source._id);
            }
        },
        name:{
            type: new GraphQLNonNull(GraphQLString)
        },
        cover:{
            type: GraphQLString
        },
        releaseDate:{
            type: GraphQLString
        }
    }

})