const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');


// Gets back all the posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find(); // method on mongoose, returns all posts
        res.json(posts);
    } catch (err) {

    }
});


// Submits a post
router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    post.save() // Promise
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message: err });
    })
});

// Gets back specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId); // finds post in Post DB by id 
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete a specific post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.findByIdAndRemove(req.params.postId); // deletes post based on id
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update a specific post
// PUT vs PATCH
// PUT replaces a resource in its entirety, PATCH updates a part of an existing resource
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId }, { $set: {title: req.body.title } });
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;