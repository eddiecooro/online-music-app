module.exports = {
    Album: {
        id: (source, args, context) => {
            return context.dbIdToNodeId(source.__modelName, source._id);
        },

        songs: (source, args, context) => {
            return context.getSong_AlbumId("Song", source._id).then((data) => {
                if (!Array.isArray(data)) {
                    data = [data];
                }
                return data;
            }).catch((err) => {
                console.log(err);
            });
        },

        artist: async (source, args, context) => {
            var songId = []
            var ArtistList = []
            //Get SongId From AlbumId
            await context.getSongId_AlbumId("Song", source._id).then((data) => {
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
            return context.getArtist_SongId("Artist", songId).then((data) => {

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
