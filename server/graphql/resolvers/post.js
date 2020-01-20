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
        pics.push(
          new Promise(async (resolve) => {
            const {createReadStream, filename} = await el;

            await new Promise((res, rej) =>
              createReadStream()
                .pipe(createWriteStream(path.join("static/images", `1${filename}`)))
                .on('error', rej)
                .on("close", res)
            );
            resolve(`static/images/1${filename}`);
          })
          )
      });

      const picturesForDB = await Promise.all(pics);

      panoramas.map(async (el) => {
        pans.push(
          new Promise(async (resolve) => {
            const {createReadStream, filename} = await el;

            await new Promise((res, rej) =>
              createReadStream()
                .pipe(createWriteStream(path.join("static/images", `1${filename}`)))
                .on('error', rej)
                .on("close", res)
            );
            resolve(`static/images/1${filename}`);
          }));
      });

      const panoramasForDB = await Promise.all(pans);

      const newPost = new Post({
        title,
        description,
        price,
        pictures: picturesForDB,
        panoramas: panoramasForDB,
        createdAt: new Date().toISOString(),
        userId: anon.id,
        location,
      });

      const res = await newPost.save();
      console.log(res)
      return true;
    }
  }
}