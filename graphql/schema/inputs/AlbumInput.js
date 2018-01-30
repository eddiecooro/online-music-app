const albumInput = `
    input AlbumCreateInput {
        name: String!
        cover: String
        releaseDate: String
    }

    input AlbumUpdateInput {
        id: ID!
        name: String
        cover: String
        releaseDate: String
    }

    input AlbumDeleteInput {
        id: ID!
    }
`;

export default albumInput;