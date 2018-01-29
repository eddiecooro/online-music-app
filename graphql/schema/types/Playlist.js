const Playlist = `
    type Playlist implements Node {
        id: ID!
        name: String
        tracks: [Song]
        cover: String
        private: Boolean
        expireDate: String
        trackCount: Int
    }
`

export default Playlist;