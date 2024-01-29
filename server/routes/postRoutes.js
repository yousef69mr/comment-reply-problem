import express from "express"
import mongoose from "mongoose";
import Post from "../models/post";


const router = express.Router()

mongoose.connect('mongodb+srv://root:toor@cluster0.rklht9r.mongodb.net/COMMENT-REPLY-PROBLEM?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Create a new post
router.post('/', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.json(allPosts).status(200);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Get a specific post by ID
router.get('/:id', async (req, res) => {
    try {
        const foundPost = await Post.findOne({ id: req.params.id });
        if (!foundPost) {
            return res.status(404).send('Post not found');
        }
        res.json(foundPost).status(200);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Update a post by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).send('Post not found');
        }
        res.json(updatedPost).status(200);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findOneAndDelete({ id: req.params.id });
        if (!deletedPost) {
            return res.status(404).send('Post not found');
        }
        res.json(deletedPost).status(204);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


export default router
