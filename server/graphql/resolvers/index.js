const usersResolvers = require('./users');
const postsResolvers = require('./post');
const typesResolvers = require('./types');

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
  Date: typesResolvers.Date,
}