const db = require('../config/db');

function getAllPosts() {
  return db('posts').select('*');
}

function getPostById(id) {
  return db('posts').where({ id }).first();
}

function createPost(post) {
  return db('posts').insert(post).returning('*');
}

function updatePost(id, post) {
  return db('posts').where({ id }).update(post).returning('*');
}

function deletePost(id) {
  return db('posts').where({ id }).del();
}

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
