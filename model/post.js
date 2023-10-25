const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: String,
  title: String,
  creatorName: String,
  date: String,
  location: String,
  description: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
