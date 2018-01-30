const songInput = `
    input SongCreateInput {
        name: String!
        description: String
        lyrics: [String]
        genre: [String]
        releaseDate: String
        url: String
        cover: String
        tags: [String]
    }

    input SongUpdateInput {
        id: ID!
        name: String
        description: String
        lyrics: [String]
        genre: [String]
        releaseDate: String
        url: String
        cover: String
        tags: [String]
        album: ID
        artists: [ID]
    }

    input SongDeleteInput {
        id: ID!
    }
`;

export default songInput;