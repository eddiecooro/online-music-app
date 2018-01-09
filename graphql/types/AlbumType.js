import {nodeInterface} from '../node'
import *  as db from '../databaseAdapter'
import {GraphQLObjectType
,GraphQLNonNull,
GraphQLString} from 'graphql'


export const AlbumType = new  GraphQLObjectType({
    name:"Album",
    interface:[nodeInterface],
    fields:{
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