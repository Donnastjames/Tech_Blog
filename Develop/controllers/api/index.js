const router = require('express').Router();

const blogPostRoutes = require('./blogPostRoutes');
const userRoutes = require('./userRoutes');
const newCommentRoutes = require('./blogCommentRoutes');

router.use('/blogPosts', blogPostRoutes);
router.use('/newComment', newCommentRoutes);
router.use('/users', userRoutes);

module.exports = router;