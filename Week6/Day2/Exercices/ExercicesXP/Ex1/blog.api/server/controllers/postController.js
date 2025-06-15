const Post = require('../models/postModel');

async function getAllPosts(req, res) {
  const posts = await Post.getAllPosts();
  res.json(posts);
}

async function getPostById(req, res) {
  const post = await Post.getPostById(req.params.id);
  if (post) res.json(post);
  else res.status(404).json({ error: 'Post not found' });
}

async function createPost(req, res) {
  const [newPost] = await Post.createPost(req.body);
  res.status(201).json(newPost);
}

async function updatePost(req, res) {
  const [updatedPost] = await Post.updatePost(req.params.id, req.body);
  res.json(updatedPost);
}

async function deletePost(req, res) {
  await Post.deletePost(req.params.id);
  res.json({ message: 'Post deleted' });
}

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
