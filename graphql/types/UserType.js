import {nodeInterface} from './node.js';
import {PlaylistType} from './PlaylistType';
import {ArtistType} from './ArtistType';
import {SongType} from './SongType';
import * as db from '../databaseAdapter';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull,
} from 'graphql';

export const UserType = new GraphQLObjectType({
    name: "User",
    interfaces: [nodeInterface],
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (source, args, context)=>{
                return db.dbIdToNodeId(source.constructor.modelName, source._id);
            }
        },
        emailValidated: {
            type: GraphQLString
        },
        username: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        avatar: {
            type: GraphQLString,
        },
        age: {
            type: GraphQLInt,
        },
        playlists: {
            description: "Playlists created by this user",
            type: PlaylistType,
            resolve: (source, args, context)=>{
                return db.getPlaylists(source.playlists)
            }
        },
        followedArtists: {
            description: "Artists followed by this user",
            type: ArtistType,
            resolve: (source, args, context)=>{
                return db.getArtists(source.followedArtists);
            }
        },
        listenedSongs: {
            description: "Songs listened by this user",
            type: SongType,
            resolve: (source, args, context)=>{
                let songrels = source.listenedSongs;
                songrels.filter((srel)=>{
                    return srel.type === "listened";
                });
                return db.getSongs(songrels);
            }
        },
        likedSongs: {
            description: "Songs liked by this user",
            type: SongType,
            resolve: (source, args, context)=>{
                let songrels = source.listenedSongs;
                songrels.filter((srel)=>{
                    return srel.type === "liked";
                });
                return db.getSongs(songrels);
            }
        }
    }
})