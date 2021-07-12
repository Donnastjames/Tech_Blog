const router = require('express').Router();
const { Blog_Comment, Blog_Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  console.log('homeRoutes GET / called with req.session:', JSON.stringify(req.session, null, 2));
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

    console.log('blogPostData:\n', JSON.stringify(blogPostData, null, 2));

    // Serialize data so the template can read it
    const blogPosts = blogPostData.map(blogPost => blogPost.get({ plain: true }));

    console.log('blogPosts:\n', JSON.stringify(blogPosts, null, 2));

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
