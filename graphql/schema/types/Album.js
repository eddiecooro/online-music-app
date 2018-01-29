const Album = `
    type Album implements Node {
        id: ID!
        name: String
        cover: String
        releaseDate: String
        songs: [Song]
        artists: [Artist]
    }
`

export default Album;