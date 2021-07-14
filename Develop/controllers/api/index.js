const router = require('express').Router();

const blogPostRoutes = require('./blogPostRoutes');
const blogCommentRoutes = require('./blogCommentRoutes');
const userRoutes = require('./userRoutes');

router.use('/blogPosts', blogPostRoutes);
router.use('/blogComments', blogCommentRoutes);
router.use('/users', userRoutes);

module.exports = router;