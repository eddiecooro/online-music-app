const Song = `
    type Song implements Node {
        id: ID!
        name: String!
        description: String
        lyrics: [String]
        genre: [String]
        releaseDate: String
        url: String
        cover: String
        album: Album
        tags: [String]
        artists: [Artist]
        playlist: [Playlist]
        likedBy: [User]
    }
`

export default Song;