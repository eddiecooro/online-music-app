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
        },
        viewer: (source,args,context)=>{
            if(context.user){
                context.user.__modelName = "User";
                return context.user;
            } else {
                return null
            }
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
        },
        songs: (source,args,context) =>{
            return db.getData("Song",source._id,{"albumId" : {$in : source._id}}).then((data) =>{
                if(!Array.isArray(data)){
                    data = [data];
                }
                return data;
            }).catch((err) => {
                console.log(err);
            });
        },
        artists: async (source,args,context) =>{
             var songId = []
             var ArtistList = []
            await db.getData("Song",source._id,{"albumId" : source._id},{"_id" : 1}).then((data) =>{
                if(!Array.isArray(data)){
                    data = [data]
                }
                songId = data.slice();
                return data;
            }).catch((err) => {
                console.log(err);
            });
            songId =songId.map((e)=>{
                return e._id
            })
            console.log(songId)
            return db.getData("Artist",songId,{ 'songs' : {$elemMatch : { 'song' : {$in : songId} }}}).then((data) => {
                if(!Array.isArray(data)){
                    data = [data]
                }
                songId = data.slice()   
                    return data
                }).catch((err) => {
                    console.log(err)
                });
                songId.filter((e,p) =>{
                    return songId.indexOf(e) == p;
                })
                return songId
        }
    },
    Song: {
        id: (source, args, context)=>{
            return db.dbIdToNodeId(source.__modelName, source._id);
        },
        album: (source, args, context)=>{
            return db.getData("Album",source.albumId).then((data)=>{
                return data 
            }).catch((err)=>{
                console.log(err)
            });
        },
        artists: (source,args,context) => {
            
            return db.getData("Artist",source._id,{ 'songs' : {$elemMatch : { 'song' : {$in : source._id} }}}).then((data) => {
            if(!Array.isArray(data)){
                data = [data]
            }
                return data
            }).catch((err) => {
                console.log(err)
            });
        }
    },
    Artist: {
        id: (source, args, context)=>{
            return db.dbIdToNodeId(source.__modelName, source._id);
        },
        albums: async (source,args,context) =>{
             var albumIds = [];
             var songId = source.songs.map((s) =>{
                 return s.song
             });
             
             await db.getData("Song",songId,{'_id' : {$in : songId}},{'albumId':1}).then((data) => {
                if(!Array.isArray(data)){
                    data = [data]
                }
                albumIds = data.slice()
                return data
             }).catch((err) => {
                console.log(err)
             });
             albumIds = albumIds.map((e) =>{
                 return e.albumId
             })
             albumIds = albumIds.filter((e,p) =>{
                    return albumIds.indexOf(e) == p;
             })
            return db.getData("Album",albumIds).then((data)=>{
                if(!Array.isArray(data)){
                    data = [data]
                }
                return data
            }).catch((err) => {
                console.log(err)
            })
        },
        songs: (source, args, context)=>{
            let songIds = source.songs.map((songRel)=>{
                return songRel.song;
            });
            return db.getData("Song",songIds).then((data)=>{
                if(!Array.isArray(data)){
                    data = [data]
                }
                return data
            }).catch((err)=>{
                console.log(err)
            });
        },
    }
    
}