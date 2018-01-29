const Query = `type Query {
    node(id:ID!): Node
    search(text: String!): [Node]
    viewer: User
}`;

export default [Query];