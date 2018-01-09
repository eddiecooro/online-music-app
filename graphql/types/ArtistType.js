import {nodeInterface} from '../node.js';
import {PlaylistType} from './PlaylistType';
import {UserType} from './UserType';
import {AlbumType} from './AlbumType';
import { SongType } from './SongType';
import * as db from '../databaseAdapter';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQlNumber
} from 'graphql';

export const ArtistType = new GraphQLObjectType({
    name: "Artist",
    interfaces: [nodeInterface],
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (source, args, context)=>{
                return db.dbIdToNodeId(source.__modelName, source._id);
            }
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        avatar:{
            type: GraphQLString
        },
        age:{
            type:GraphQlNumber
        },
        SingerType:{
            type: new GraphQLNonNull(GraphQLString)
        },
        descriptions: {
            type: GraphQLString,
        },
        albums:{
            type:AlbumType,
            resolve:(source,args,context) =>{
                var albumId = source.albums.map((albumRel) =>{
                    return albumRel.album
                })
                
                return db.getData(albumId,Artist)
            }
        },
        songs: {
            type: SongType,
            resolve: (source, args, context)=>{
                let songIds = source.songs.map((songRel)=>{
                    return songRel.song;
                });
                return db.getData(songIds,"Song").then((data)=>{
                    return data
                }).catch((err)=>{
                    console.log(err)
                });
            },
        },
    }
})