const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  title: String,
  description: String,
  createdAt: String,
  userId: String,
  price: Number,
  pictures: [{ type: String }],
  panoramas: [{ type: String }],
  location: {
    locationName: String,
    lon: String,
    lat: String,
  },
});

module.exports = model('Post', postSchema);