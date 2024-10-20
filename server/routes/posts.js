import express from "express";
import { createPost, getPosts, getPost, getPostsBySearch, updatePost, deletePost, likePost, commentPost } from "../controllers/posts.js";
import auth from '../middleware/auth.js';

const router = express.Router();

// localhost:5000/posts
router.get('/',getPosts);
router.get('/search',getPostsBySearch);
router.get('/:id',getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);   // auth here as 1 user 1 like
router.post('/:id/commentPost', auth, commentPost);

export default router;