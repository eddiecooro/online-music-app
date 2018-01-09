import {nodeInterface} from '../node.js';
import {PlaylistType} from './PlaylistType';
import {ArtistType} from './ArtistType';
import {UserType} from './UserType';
import {AlbumType} from './AlbumType';
import * as db from '../databaseAdapter';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
} from 'graphql';

export const SongType = new GraphQLObjectType({
    name: 'Song',
    interfaces: [nodeInterface],
    feilds: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (source, args, context)=>{
                return db.dbIdToNodeId(source.__modelName, source._id);
            }
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        description: {
            type: GraphQLString,
        },
        label: {
            type: GraphQLString,
        },
        genre: {
            type: new GraphQLList(GraphQLString),
        },
        releaseDate: {
            type: GraphQLString,
        },
        url: {
            type: GraphQLString,
        },
        cover: {
            type: GraphQLString,
        },
        album: {
            type: AlbumType,
            resolve: (source, args, context)=>{
                return db.getData(source.album,"Album").then((data)=>{
                    return data
                }).catch((err)=>{
                    console.log(err)
                });
            }
        },
        tags: {
            type: new GraphQLList(GraphQLString),
        }
    }
});