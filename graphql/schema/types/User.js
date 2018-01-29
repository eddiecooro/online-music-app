const User = `
    type User implements Node {
        id: ID!
        username: String!
        email: String
        nickname: String
        avatar: String
        age: Int
        playlists: [Playlist]
        followedArtists: [Artist]
        listenedSongs: [Song]
        likedSongs: [Song]
        hatedSongs: [Song]
    }
`

export default User;