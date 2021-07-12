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
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  console.log('GET /dashboard called');
  console.log('req.session:\n', JSON.stringify(req.session, null, 2));
  try {
    // Find the logged in user based on this session's user_id ...
    const blogPostData = await Blog_Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });

    console.log('blogPostData:\n', JSON.stringify(blogPostData, null, 2));

    const blogPosts = blogPostData.map(blogPost => blogPost.get({ plain: true }));

    console.log('blogPosts:\n', JSON.stringify(blogPosts, null, 2));

    // TODO: Getting away with using homepage.handlebars for now, but
    // will need to change this, because the dashboard is supposed to allow
    // adding a new Blog Post.  The homepage is not supposed to allow that ...
    res.render('homepage', {
      blogPosts,
     // logged_in: true
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
