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
  locationName: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
});

postSchema.index({ "location": "2dsphere" });

module.exports = model('Post', postSchema);