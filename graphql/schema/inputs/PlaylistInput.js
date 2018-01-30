const songInput = `
    input PlaylistCreateInput {
        name: String!
        cover: String
        private: Boolean
    }

    input PlaylistUpdateInput {
        id: ID!
        name: String
        cover: String
        private: Boolean
    }

    input PlaylistDeleteInput {
        id: ID!
    }
`;

export default songInput;