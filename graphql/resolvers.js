import * as db from './databaseAdapter';

export const resolvers = {
    Query: {
        node:(source,args,context)=>{
            return db.getData(...db.nodeIdToDbId(args.id)).then((data)=>{
                // console.log(data);
                return data;
            }).catch((err)=>{
                console.log(err);
            });
        },
        search: (source, args, context)=>{
            let modelsToSearch = ["User","Playlist","Song","Artist","Album"];
            return db.search(modelsToSearch,args.text).then((data)=>{
                return data;
            }).catch((err)=>{
                console.log(err);
            });
        }
    },
    Node: {
        __resolveType(source, context, info){
            return source.__modelName;
        }
    },
    User: {
        id: (source, args, context)=>{
            return db.dbIdToNodeId(source.__modelName, source._id);
        },
        playlists: (source, args, context)=>{
             return db.getData("Playlist",source.playlists).then((data) => {
                return data
            }).catch((err) =>{
                console.log(err)
            });
        },
        followedArtists: (source, args, context)=>{
            return db.getData("Artist",source.followedArtists).then((data)=>{
                return data
            }).catch((err)=>{
                console.log(err)
            });
        },
        listenedSongs: (source, args, context)=>{
            let songrels = source.songsRels;
            let listeneds = songrels.filter((srel)=>{
                return srel.rel === "listened";
            });
            let listenedIds = listeneds.map((listened)=>{
                return listened.songId;
            });
            return db.getData("Song",listenedIds).then((data)=>{
                return data
            }).catch((err)=>{
                console.log(err)
            });
        },
        likedSongs: (source, args, context)=>{
            let songrels = source.songsRels;
            let likeds = songrels.filter((srel)=>{
                return srel.rel === "liked";
            });
            let likedIds = likeds.map((liked)=>{
                return liked.songId;
            });
            return db.getData("Song",likedIds).then((data)=>{
                // console.log(data);
                return data
            }).catch((err)=>{
                console.log(err)
            });
        },
    },
    Playlist: {
        id: (source, args, context)=>{
            return db.dbIdToNodeId(source.__modelName, source._id);
        },
        
        tracks: (root,args,context) =>{
            var songId = root.tracks
            return db.getData("Song",songId) 
        },
        trackCount: (root,args,context) =>{
            return root.tracks.length
        }
    },
    Album: {
        id: (source, args, context)=>{
            return db.dbIdToNodeId(source.__modelName, source._id);
        }
    },
    Song: {
        id: (source, args, context)=>{
            return db.dbIdToNodeId(source.__modelName, source._id);
        },
        album: (source, args, context)=>{
            // console.log(source)
            return db.getData("Album",source.albumId).then((data)=>{
                return data
            }).catch((err)=>{
                console.log(err)
            });
        },
        
    },
    Artist: {
        id: (source, args, context)=>{
            return db.dbIdToNodeId(source.__modelName, source._id);
        },
        albums: (source,args,context) =>{
            var albumId = source.albums.map((albumRel) =>{
                return albumRel.album
            })
            console.log(albumId)
            return db.getData("Album",albumId).then((data)=> {
                return data
            }).catch((err) => {
                console.log(err)
            });
        },
        songs: (source, args, context)=>{
            let songIds = source.songs.map((songRel)=>{
                return songRel.song;
            });
            return db.getData("Song",songIds).then((data)=>{
                return data
            }).catch((err)=>{
                console.log(err)
            });
        },
    }
    
}