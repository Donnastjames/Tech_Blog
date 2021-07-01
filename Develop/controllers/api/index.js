const router = require('express').Router();

const blogPostRoutes = require('./blogPostRoutes');

router.use('/blogPosts', blogPostRoutes);

module.exports = router;