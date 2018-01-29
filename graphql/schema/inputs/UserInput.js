const userInput = `
    input UserCreateInput {
        username: String!
        email: String!
        password: String!
        nickname: String
        avatar: String
        age: Int
    }

    input UserUpdateInput {
        id: ID!
        username: String
        email: String
        nickname: String
        avatar: String
        age: Int
    }

    input UserDeleteInput {
        id: ID!
    }
`;

export default userInput;