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
  try {
    // Get a particular blogPostData and join with user and comment data ...
    const blogPostData = await Blog_Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },
      ],
    });
 
    const blogPost = blogPostData.get({ plain: true });

    // Get all comments that pertain to the given blog_post_id ...
    const blogCommentData = await Blog_Comment.findAll({
      where: { blog_post_id: req.params.id },
      include: [
        { model: User, attributes: ['username'] },
      ],
    });
 
    const blogComments = blogCommentData.map(comment => comment.get({ plain: true }));

    res.render('blogPost', {
      blogPost,
      blogComments,
      user_owned_post: req.session.user_id === blogPost.user.id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id/update', withAuth, async (req, res) => {
  try {
    const updateBlog = await Blog_Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updateBlog);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id/update', withAuth, async (req, res) => {
  try {
    const blogData = await Blog_Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog(s) found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id/update', withAuth, async (req, res) => {
  try {
    const blogPostData = await Blog_Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });

    const blogPost = blogPostData.get({ plain: true });

    res.render('updateBlogPost', {
      blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;