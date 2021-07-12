const router = require('express').Router();
const { Blog_Comment, Blog_Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  res.render('newBlogPost', {
    logged_in: req.session.logged_in,
  });
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await Blog_Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  console.log('blogPostRoutes GET /:id called with req.session:', JSON.stringify(req.session, null, 2));
  console.log('req.params:\n', JSON.stringify(req.params, null, 2));
  try {
    // Get a particular blogPostData and join with user and comment data ...
    const blogPostData = await Blog_Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
 
    const blogPost = blogPostData.get({ plain: true });

    console.log('blogPost:\n', JSON.stringify(blogPost, null, 2));

    // Get all comments that pertain to the given blog_post_id ...
    const blogCommentData = await Blog_Comment.findAll({
      where: { blog_post_id: req.params.id },
      include: [
        { model: User, attributes: ['username'] },
      ],
    });

    console.log('blogCommentData:\n', JSON.stringify(blogCommentData, null, 2));
 
    const blogComments = blogCommentData.map(comment => comment.get({ plain: true }));

    console.log('blogComments:\n', JSON.stringify(blogComments, null, 2));

    res.render('blogPost', {
      blogPost,
      blogComments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;