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
          await new Promise((res, rej) =>
            createReadStream()
              .pipe(createWriteStream(path.join("static/images", filename)))
              .on('error', rej)
              .on("close", res)
          );
          pics.push(`static/images/${filename}`);
          console.log(pics);
        })
        panoramas.map(async (el) => {
          const { createReadStream, filename } = await el;
          await new Promise((res, rej) =>
            createReadStream()
              .pipe(createWriteStream(path.join("static/images", filename)))
              .on('error', (e) => {rej(e)})
              .on("close", res)
          );
          pans.push(`static/images/${filename}`);
          console.log(pans);
        })
        resolve();
      })};

      function toDB(pics, pans) {
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
      setTimeout(() => {
        console.log(pics);
        setTimeout(() => console.log(pans), 3000)
      }, 10000);
      toFS().then(toDB).catch(err => console.log(err));
      return true;
    }
  }
}