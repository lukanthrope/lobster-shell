const { createWriteStream } = require("fs");
const path = require('path');
const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Mutation: {
    async addPost(_, { 
      postInput: { 
        title, 
        description, 
        pictures, 
        panoramas, 
        price,
        locationName, 
        lon, 
        lat, 
      } 
    }, ctx) {
      const anon = checkAuth(ctx);
      let pics = [];
      let pans = [];

      console.log(locationName + '\n' + lon + '\n' + lat);

      pictures.map(async (el) => {
        pics.push(
          new Promise(async (resolve) => {
            const { createReadStream, filename } = await el;

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
            const { createReadStream, filename } = await el;

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
        location: {
          locationName,
          lon,
          lat,
        },
      });

      const res = await newPost.save();
      
      return true;
    }
  },
  Query: {
    async getPosts(_, { limit, offset, request }) {
      try {
        if (request && request.trim() !== '') {
          const req = request.split(/[.,\/ \t\n\v\f\r\s -]/).filter(el => el.trim() !== '');
          const re = new RegExp(req.join(".*"), 'gi');
          
          const res = await Post
            .find({ 
              $or: [ { 
                "location.locationName": { $regex: re } 
                }, 
                { 
                  description: { 
                    $regex: re 
                  } 
                },
                {
                  title: {
                    $regex: re
                  }
                }
              ] })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset);

          return res;
        } else {
          const res = await Post
            .find({ location: { $ne: null } })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset);
          return res;
        }
      } catch(err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}