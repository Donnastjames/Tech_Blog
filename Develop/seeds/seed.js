const sequelize = require('../config/connection');
const { User, Blog_Post, Blog_Comment } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const blogCommentData = require('./blogCommentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Blog_Post.bulkCreate(blogPostData);

  await Blog_Comment.bulkCreate(blogCommentData);

  process.exit(0);
};

seedDatabase();