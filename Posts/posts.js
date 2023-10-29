const Post = require('../model/post');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const POSTS_FILE = 'posts.json';

// Function to read the posts from the JSON file
function readPostsData() {
  const filePath = path.join(__dirname, POSTS_FILE);

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty array
    return [];
  }
}

// Function to write the posts data to the JSON file
function writePostsData(posts) {
  const filePath = path.join(__dirname, POSTS_FILE);
  const data = JSON.stringify(posts, null, 2);
  fs.writeFileSync(filePath, data, 'utf8');
}

// Create a new post
exports.createPost = (req, res, next) => {
  const { userId, title, creatorName, date, location, description } = req.body;

  try {
    if (!userId || !title || !creatorName || !date || !location || !description) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    // Read existing posts
    const posts = readPostsData();

    // Create a new post
    const newPost = {
      id: uuidv4(),
      userId,
      title,
      creatorName,
      date,
      location,
      description,
    };

    // Add the new post to the array
    posts.push(newPost);

    // Write the updated posts to the JSON file
    writePostsData(posts);

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

// Retrieve all posts
exports.getPosts = (req, res, next) => {
  try {
    const posts = readPostsData();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
};

// Delete a post by its ID
exports.deletePost = (req, res, next) => {
  try {
    const postId = req.params.postId;
    const posts = readPostsData();
    const index = posts.findIndex((post) => post.id === postId);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Post not found or couldn\'t be deleted' });
    }

    // Remove the post from the array
    posts.splice(index, 1);

    // Write the updated posts to the JSON file
    writePostsData(posts);

    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while deleting the post' });
  }
};

// Update a post by its ID
exports.updatePost = (req, res, next) => {
  try {
    const postId = req.body._id;
    const updates = req.body;
    const posts = readPostsData();

    const index = posts.findIndex((post) => post._id === postId);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Post not found or couldn\'t be updated' });
    }

    // Update the post
    posts[index] = { ...posts[index], ...updates };

    // Write the updated posts to the JSON file
    writePostsData(posts);

    res.status(200).json({ success: true, message: 'Post updated successfully', updatedPost: posts[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while updating the post' });
  }
};

