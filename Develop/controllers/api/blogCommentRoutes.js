const router = require('express').Router();
const { Blog_Comment } = require('../../models');
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

module.exports = router;