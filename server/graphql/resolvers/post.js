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

      function toFS() {
        return new Promise(resolve => {
        pictures.map(async (el) => {
          const { createReadStream, filename } = await el;
          console.log(1);
          await new Promise(res =>
            createReadStream()
              .pipe(createWriteStream(path.join("static/images", filename)))
              .on("close", res)
          );
          pics.push(`static/images/${filename}`);
        })
        panoramas.map(async (el) => {
          const { createReadStream, filename } = await el;

          await new Promise(res =>
            createReadStream()
              .pipe(createWriteStream(path.join("static/images", filename)))
              .on("close", res)
          );
          pans.push(`static/images/${filename}`);
        })
        resolve();
      })};

      setTimeout(() => console.log(pans), 10000);
      function toDB() {
        return new Promise(async resolve => {
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
          
          resolve();
      })};

      toFS().then(toDB).catch(err => console.log(err));
      return true;
    }
  }
}