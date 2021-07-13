const router = require('express').Router();
const { Blog_Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogPostData and JOIN with user data
    const blogPostData = await Blog_Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogPosts = blogPostData.map(blogPost => blogPost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request back to the Home page ...
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// https://expressjs.com/en/guide/error-handling.html
router.get('/signUp', (req, res, next) => {
  // If the user is already logged in go to next() with an error ...
  if (req.session.logged_in) {
    next(new Error("Can't visit /signUp when already logged in!"));
    return;
  }

  res.render('signUp');
});

module.exports = router;
