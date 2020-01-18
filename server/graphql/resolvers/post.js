const { UserInputError } = require('apollo-server');
const { createWriteStream } = require("fs");
const path = require('path');
const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Mutation: {
    async addPost(_, { postInput: { title, description, pictures, panoramas, price, location } }, ctx) {
      const anon = checkAuth(ctx);
      let pics = [];
      let pans = [];

      pictures.map(async (el) => {
        const { createReadStream, filename } = await el;
        
        await new Promise(res =>
          createReadStream()
            .pipe(createWriteStream(path.join("static/images", filename)))
            .on("close", res)
        );
        pics.push(`static/images/, ${filename}`);
      })
      panoramas.map(async (el) => {
        const { createReadStream, filename } = await el;

        await new Promise(res =>
          createReadStream()
            .pipe(createWriteStream(path.join("static/images", filename)))
            .on("close", res)
        );
        pans.push(path.join("static/images", filename));
      })

      console.log(pics);

      const newPost = new Post({
        title,
        description,
        price,
        pictures: pics,
        panoramas: pans,
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