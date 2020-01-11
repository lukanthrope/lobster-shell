const usersResolvers = require('./users');
const postsResolvers = require('./post');

module.exports = {
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
}