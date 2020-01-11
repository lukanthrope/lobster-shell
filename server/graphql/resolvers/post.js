const { UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Mutation: {
    async addPost(_, { postInput: { title, description, pictures, panoramas, price, location } }, ctx) {
      const anon = checkAuth(ctx);
      const newPost = new Post({
        title,
        description,
        price,
        pictures,
        panoramas,
        createdAt: new Date().toISOString(),
        userId: anon.id,
        location,
      });

      const res = await newPost.save();
      console.log(res)
      return {
        ...res._doc,
        id: res._id,
      }
    }
  }
}