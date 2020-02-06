
const { gql } = require('apollo-server-express');

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

  type Location {
    locationName: String!
    lat: String
    lon: String
  }

  type Post {
    id: ID!
    title: String!
    description: String
    createdAt: String!
    userId: ID!
    price: Float
    pictures: [String]
    panoramas: [String]
    location: Location!
  }

  input PostInput {
    title: String!
    locationName: String!
    lon: String
    lat: String
    description: String
    pictures: [Upload]
    panoramas: [Upload]
    price: Float
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

    addPost(postInput: PostInput!): Boolean
    addImage(file: [Upload]): Boolean
  }
`;