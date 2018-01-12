module.exports = {
    Album: {
        id: (source, args, context) => {
            return context.db.dbIdToNodeId(source.__modelName, source._id);
        },

        songs: (source, args, context) => {
            return context.db.getSong_AlbumId("Song", source._id).then((data) => {
                if (!Array.isArray(data)) {
                    data = [data];
                }
                return data;
            }).catch((err) => {
                console.log(err);
            });
        },

        artists: async (source, args, context) => {
            var songId = []
            var ArtistList = []
            //Get SongId From AlbumId
            await context.db.getSongId_AlbumId("Song", source._id).then((data) => {
                if (!Array.isArray(data)) {
                    data = [data]
                }
                songId = data.slice();
                return data;
            }).catch((err) => {
                console.log(err);
            });
            songId = songId.map((e) => {
                return e._id
            })

            //Then getArtistOfAlbums From SongId
            return context.db.getArtist_SongId("Artist", songId).then((data) => {

                if (!Array.isArray(data)) {
                    data = [data]
                }
                ArtistList = data.slice()
                return data
            }).catch((err) => {
                console.log(err)
            });
            ArtistList.filter((e, p) => {
                return ArtistList.indexOf(e) == p;
            })
            return ArtistList
        }
    }
}
