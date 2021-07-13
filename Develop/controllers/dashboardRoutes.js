const router = require('express').Router();
const { Blog_Comment, Blog_Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
  console.log('GET dashboard / called');
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

    res.render('dashboard', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;