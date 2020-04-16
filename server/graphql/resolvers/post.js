const { createWriteStream } = require("fs");
const path = require('path');
const moment = require('moment');
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
        schedule: [],
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

      await newPost.save();
      
      return true;
    },
    async bookPost(_, { postId, start, end }) {
      try {
        const post = await Post.findById(postId);
       
        if (!post)
          throw new Error('Post not found');
        
        const { schedule } = post;
        
        for (let i = 0; i < schedule.length; i++) {
          if ((start > schedule[i].fromDate.getTime() && start < schedule[i].toDate.getTime()) ||
          (end > schedule[i].fromDate.getTime() && end < schedule[i].toDate.getTime())) {
            return false;
          }
        }
      
        await Post.updateOne({ _id: postId },
           { 
             $push: {  
              "schedule": { 
                "fromDate": new Date(start), 
                "toDate": new Date(end), 
             } 
            } 
          });
        return true;
      } catch(err) {
        throw new Error(err);
      }
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
        let post = await Post.findById(postId);
        if (post) {
          const len = post.schedule.length;
          post.schedule = post.schedule.filter(el => 
            el.toDate.getTime() > new Date().getTime());
          
          if (len > post.schedule.length) {
            await Post.updateOne({ _id: postId }, {
              "schedule": post.schedule
            });
          }
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}