const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  title: String,
  description: String,
  createdAt: String,
  userId: String,
  schedule: [{ 
    fromDate: Date, 
    toDate: Date,
  }],
  pictures: [{ type: String }],
  panoramas: [{ type: String }],
  location: {
    locationName: String,
    lon: String,
    lat: String,
  },
});

module.exports = model('Post', postSchema);