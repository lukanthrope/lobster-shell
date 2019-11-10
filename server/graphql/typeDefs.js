
const gql = require('graphql-tag');

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
  }
`;