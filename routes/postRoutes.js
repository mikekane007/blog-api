const express = require('express');
const Post = require('./models/post.js');
const protect = require('./middlewares/authMiddleware.js')
const router = express.Router();

//CREATE a post
router.post('/', protect, async (req, res) => {
    try {
        const post = await Post.create({ ...req.body, author: req.user.id})
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//GET all posts
router.get('/', async (req, res) => { 
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
})

//UPDATE a post
router.put('/:id', protect, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(post.author.toString() !== req.user.id) {
        return res.status(401).json({message: 'Not authorised'});
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(updatedPost);   
})

//DELETE Post
router.delete('/:id', protect, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await post.remove();
    res.json({ message: 'Post removed' });
  });
  
  module.exports = router;