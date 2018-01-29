const Artist = `
    type Artist implements Node {
        id: ID!
        name: String
        description: String
        avatar: String
        age: Int
        SingerType: String
        albums: [Album]
        songs: [Song]
        followedBy: [User]
    }
`

export default Artist;