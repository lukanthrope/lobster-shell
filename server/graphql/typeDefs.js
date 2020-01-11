
const gql = require('graphql-tag');

module.exports = gql`
  type File {
    id: ID!
    filename: String!
    encoding: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  type Post {
    id: ID!
    title: String!
    description: String
    createdAt: String!
    userId: ID!
    price: Float
    pictures: [File]
    panoramas: [File]
    location: String!
  }

  input FileInput {
    url: [String]!
  }

  input PostInput {
    title: String!
    description: String
    pictures: FileInput
    panoramas: FileInput
    price: Float
    location: String!
  }

  input RegisterInput {
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

    addPost(postInput: PostInput): Post!
  }
`;