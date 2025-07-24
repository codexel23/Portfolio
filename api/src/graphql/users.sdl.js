export const schema = gql`
  type User {
    id: String!
    username: String!
    email: String
    password: String!
    createdAt: DateTime!
  }

  input CreateUserInput {
    username: String!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }
`
