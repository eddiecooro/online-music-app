import {nodeInterface} from '../node.js';
import {PlaylistType} from './PlaylistType';
import {ArtistType} from './ArtistType';
import {SongType} from './SongType';
import * as db from '../databaseAdapter';
import {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull,
} from 'graphql';

module.exports = new GraphQLObjectType({
    name: "User",
    interfaces: [nodeInterface],
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (source, args, context)=>{
                return db.dbIdToNodeId(source.__modelName, source._id);
            }
        },
        emailValidated: {
            type: GraphQLBoolean
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
                return db.getData("Playlist",source.playlists).then((data)=>{
                    return data
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        followedArtists: {
            description: "Artists followed by this user",
            type: ArtistType,
            resolve: (source, args, context)=>{
                return db.getData("Artist",source.followedArtists).then((data)=>{
                    return data
                }).catch((err)=>{
                    console.log(err)
                });
            }
        },
        listenedSongs: {
            description: "Songs listened by this user",
            type: SongType,
            resolve: (source, args, context)=>{
                let songrels = source.songRels;
                let listeneds = songrels.filter((srel)=>{
                    return srel.type === "listened";
                });
                return db.getData("Song",listeneds).then((data)=>{
                    return data
                }).catch((err)=>{
                    console.log(err)
                });
            }
        },
        likedSongs: {
            description: "Songs liked by this user",
            type: SongType,
            resolve: (source, args, context)=>{
                let songrels = source.songRels;
                let likeds = songrels.filter((srel)=>{
                    return srel.type === "liked";
                });
                return db.getData("Song",likeds).then((data)=>{
                    return data
                }).catch((err)=>{
                    console.log(err)
                });
            }
        }
    }
})