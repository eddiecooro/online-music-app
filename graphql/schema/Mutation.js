const mutations = `
    type Mutation {
        login(username: String!,password: String!): String
        createUser(input:UserCreateInput): User
        updateUser(replace:Boolean, input:UserUpdateInput): User
        deleteUser(input:UserDeleteInput): Boolean
    }
`;

export default [mutations];