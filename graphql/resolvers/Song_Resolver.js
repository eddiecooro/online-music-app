module.exports = {
    Song: {
        id: (source, args, context) => {
            return context.db.dbIdToNodeId(source.__modelName, source._id);
        },
        album: (source, args, context) => {
            return context.db.getData_Id("Album", source.albumId).then((data) => {
                if (!Array.isArray(data)) {
                    data = [data]
                }
                return data
            }).catch((err) => {
                console.log(err)
            });
        },
        artists: (source, args, context) => {
            return context.db.getData_Id("Artist",context.db.getArtist_SongId).then((data) => {
                if (!Array.isArray(data)) {
                    data = [data]
                }
                return data
            }).catch((err) => {
                console.log(err)
            });
        },
        playlist: (source,args,context) =>{
            return context.db.getPlaylist_SongId("Playlist",source._id).then((data) =>{
                if(!Array.isArray(data)){
                    data = [data]
                }
                return data
            }).catch((err) => {
                console.log(err)
            });
        }
    }
}