const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  title: String,
  description: String,
  createdAt: String,
  userId: String,
  price: Number,
  pictures: [String],
  panoramas: [String],
  location: String,
});

module.exports = model('Post', postSchema);