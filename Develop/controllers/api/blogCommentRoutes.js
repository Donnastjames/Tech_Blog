const router = require('express').Router();
const { Blog_Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  res.render('addComment', {
    logged_in: req.session.logged_in,
  });
});

router.post('/', withAuth, async (req, res) => {
  try {
    const addNewComment = await Blog_Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(addNewComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id/update', withAuth, async (req, res) => {
  try {
    const blogCommentData = await Blog_Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },
      ],
    });

    const blogComment = await blogCommentData.get({ plain: true });

    res.render('updateComment', {
      blogComment,
      user_owned_comment: req.session.user_id === blogComment.user.id,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id/update', withAuth, async (req, res) => {
  try {
    const updateComment = await Blog_Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updateComment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id/update', withAuth, async (req, res) => {
  try {
    const blogCommentData = await Blog_Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogCommentData) {
      res.status(404).json({ message: 'No comment(s) found with this id!' });
      return;
    }

    res.status(200).json(blogCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;