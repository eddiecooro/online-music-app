const mutations = `
    type Mutation {
        login(username: String!,password: String!): String

        createUser(input:UserCreateInput!): User
        updateUser(replace:Boolean, input:UserUpdateInput!): User
        deleteUser(input:UserDeleteInput): Boolean

        createArtist(input:ArtistCreateInput): Artist
        updateArtist(replace:Boolean, input:ArtistUpdateInput): Artist
        deleteArtist(input:ArtistDeleteInput): Boolean

        createSong(input:SongCreateInput,artistIds:[ID],): Song
        updateSong(replace:Boolean, input:SongUpdateInput): Song
        addArtistsToSong(songId:ID! artistIds:[ID!]): Song
        deleteSong(input:SongDeleteInput): Boolean

        createAlbum(input:AlbumCreateInput,songIds:[ID]): Album
        updateAlbum(replace:Boolean, input:AlbumUpdateInput): Album
        addSongsToAlbum(albumId:ID!, songIds:[ID!]): Album
        deleteAlbum(input:AlbumDeleteInput): Boolean
        
        createPlaylist(input:PlaylistCreateInput,songIds:[ID],ownerId:ID): Playlist
        updatePlaylist(replace:Boolean, input:PlaylistUpdateInput): Playlist
        addSongsToPlaylist(playlistId:ID!, songIds:[ID!]): Playlist
        changePlaylistOwner(playlistId:ID!, newOwnerId:ID!): Playlist
        deletePlaylist(input:PlaylistDeleteInput): Boolean
    }
`;

export default [mutations];