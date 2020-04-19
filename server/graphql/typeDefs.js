
const { gql } = require('apollo-server-express');
const { GraphQLScalarType } = 'graphql';

module.exports = gql`
  scalar Date

  type FromTo {
    fromDate: Date!
    toDate: Date!
  }

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
    type: String
    coordinates: [Float]
  }

  type dist {
    calculated: Float
    location: Location
  }

  type Post @cacheControl(maxAge: 240) {
    id: ID!
    title: String!
    description: String
    createdAt: String!
    userId: ID!
    schedule: [FromTo]
    pictures: [String]
    panoramas: [String]
    locationName: String!
    location: Location
    dist: dist
  }

  input PostInput {
    title: String!
    locationName: String!
    lon: Float
    lat: Float
    description: String
    pictures: [Upload]
    panoramas: [Upload]
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts(limit: Int!, offset: Int, request: String, userId: ID, lat: Float, lon: Float): [Post] @cacheControl(maxAge: 30)
    getPost(postId: ID!): Post!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!

    addPost(postInput: PostInput!): Boolean
    bookPost(postId: ID!, start: Date!, end: Date!): Boolean!
    deletePost(postId: ID!): Boolean
  }
`;
