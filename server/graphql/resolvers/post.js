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

      /*let queryLocationString = encodeURIComponent(location);
      console.log(queryLocationString)
      const URL = `https://nominatim.openstreetmap.org/search/${queryLocationString}?format=json&addressdetails=1&limit=1&polygon_svg=1`;
      const mapResult = await axios.get(URL);
      console.log(URL);
      console.log(mapResult.data[0].lon);
      console.log(mapResult.data[0].lat);
      */
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
      console.log(res)
      return true;
    }
  }
}