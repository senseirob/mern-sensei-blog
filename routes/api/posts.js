const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const User = require('../../models/User');

//-----------------------------------------------------
// @route    POST api/posts
// @desc     Create a new blog post
// @access   Private
//-----------------------------------------------------

// CRUD - create, read, update, delete

router.post('/', async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      post: req.body.post,
      tags: req.body.tags,
      video: req.body.video,
      image: req.body.image,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sever error');
  }
});

//-----------------------------------------------------
// @route    GET api/posts
// @desc     Get all blog posts
// @access   Public
//-----------------------------------------------------

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//-----------------------------------------------------
// @route    GET api/posts/:id
// @desc     Get a blog post by id
// @access   Public
//-----------------------------------------------------

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

//-----------------------------------------------------
// @route    DELETE api/posts/:id
// @desc     Delete a blog post by id
// @access   Private
//-----------------------------------------------------

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post was not found' });
    }

    await post.remove();

    res.json({ msg: 'Post was deleted' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
  }
});

// ---------------------------------------------------------
//@route   POST  api/posts/:id  <---the route endpoint
//@desc    Update a post by id   <---what is this?
//@access  Private         <--is this a protected route?
// ---------------------------------------------------------

router.post('/:id', async (req, res) => {
  try {
    const updates = req.body;

    const options = { new: true };

    const post = await Post.findByIdAndUpdate(req.params.id, updates, options);

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post was not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
