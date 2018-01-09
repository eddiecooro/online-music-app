import {nodeInterface} from '../node'
import * as db from '../databaseAdapter'
import { GraphQLObjectType
    ,GraphQLString
    ,GraphQLNonNull
    ,GraphQLBoolean
    ,GraphQLInt } from 'graphql';
import { SongType } from './SongType';


export const PlayListType = new GraphQLObjectType({
    name:"PlayList",
    interfaces: [nodeInterface],
    fields:{
        name:{
            type: new GraphQLNonNull(GraphQLString)
        },
        tracks:{
            type:SongType,
            resolve: (root,args,context) =>{
                songId = root.tracks
                return db.getData(songId,Song) 
            }
        },
        cover:{
            type:GraphQLString
        },
        private:{
            type:GraphQLBoolean
        },
        expireDate:{
            type:GraphQLString
        },
        trackCount:{
            type:GraphQLInt,
            resolve: (root,args,context) =>{
                    return root.tracks.length
            }
            
        }
    }

})