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
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* These were copied out of a class activity
   and will be left here to use as templates later ...
router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});
*/
module.exports = router;
