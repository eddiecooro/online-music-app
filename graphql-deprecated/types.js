import *  as db from './databaseAdapter'
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQlNumber,
    GraphQLBoolean,
    GraphQLInterfaceType,
} from 'graphql';

export const NodeInterface = new GraphQLInterfaceType({
    name: 'Node',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolveType: (source) => {
        switch(source.__modelName){
            case "User":
                return UserType;
                break;
            case "Album":
                return AlbumType;
                break;
            case "Artist":
                return ArtistType;
                break;
            case "Playlist":
                return PlaylistType;
                break;
            case "Song":
                return SongType;
                break;
        }
        return null;
    }
});

export const ArtistType = new GraphQLObjectType({
    name: "Artist",
    interfaces: [NodeInterface],
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
            type:GraphQLNumber
        },
        SingerType:{
            type: new GraphQLNonNull(GraphQLString)
        },
        descriptions: {
            type: GraphQLString,
        },
        albums:{
            type: AlbumType,
            resolve:(source,args,context) =>{
                var albumId = source.albums.map((albumRel) =>{
                    return albumRel.album
                })
                
                return db.getData("Album",albumId)
            }
        },
        songs: {
            type: SongType,
            resolve: (source, args, context)=>{
                let songIds = source.songs.map((songRel)=>{
                    return songRel.song;
                });
                return db.getData("Song",songIds).then((data)=>{
                    return data
                }).catch((err)=>{
                    console.log(err)
                });
            },
        },
    }
});

export const SongType = new GraphQLObjectType({
    name: 'Song',
    interfaces: [NodeInterface],
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
                return db.getData("Album",source.album).then((data)=>{
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

export const AlbumType = new GraphQLObjectType({
    name:"Album",
    interfaces:[NodeInterface],
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
});

export const PlaylistType = new GraphQLObjectType({
    name:"Playlist",
    interfaces: [NodeInterface],
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
        tracks:{
            type: SongType,
            resolve: (root,args,context) =>{
                songId = root.tracks
                return db.getData("Song",songId) 
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

});

export const UserType = new GraphQLObjectType({
    name: "User",
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
});