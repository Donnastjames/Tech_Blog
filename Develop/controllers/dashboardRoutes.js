const router = require('express').Router();
const { Blog_Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on this session's user_id ...
    const blogPostData = await Blog_Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });

    const blogPosts = blogPostData.map(blogPost => blogPost.get({ plain: true }));

    res.render('dashboard', {
      blogPosts,
      logged_in: req.session.logged_in,
      page_description: 'Your Dashboard',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;