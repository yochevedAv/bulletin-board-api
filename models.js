const Post = require('./model/post');

exports.createPost = async (req, res, next) => {
  const {userId, title, creatorName, date, location, description } = req.body;

  try {
    if (!userId ||!title || !creatorName || !date || !location || !description) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    // Create a new post
    const newPost = await Post.create({
      userId,
      title,
      creatorName,
      date,
      location,
      description,
    });

    res.status(201).json({
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find(); // Retrieve all posts from the database
    return res.status(200).json(posts); // Respond with the posts in JSON format
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
};



exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId; // Get postId from URL parameters
    const deletedPost = await Post.findByIdAndRemove(postId);

    if (!deletedPost) {
      return res.status(404).json({ success: false, message: 'Post not found or couldn\'t be deleted' });
    }
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while deleting the post' });
  }
}

