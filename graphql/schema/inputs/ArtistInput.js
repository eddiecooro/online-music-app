const artistInput = `
    input ArtistCreateInput {
        name: String!
        description: String
        SingerType: String        
        avatar: String
        age: Int
    }

    input ArtistUpdateInput {
        id: ID!
        name: String
        description: String
        singerType: String
        avatar: String
        age: Int
    }

    input ArtistDeleteInput {
        id: ID!
    }
`;

export default artistInput;