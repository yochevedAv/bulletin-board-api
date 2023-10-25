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


