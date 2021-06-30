const User = require('./User');
const Blog_Comment = require('./Blog_Comment');
const Blog_Post = require('./Blog_Post');

User.hasMany(Blog_Post, {
  foreignKey: 'user_id',
});

Blog_Post.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Blog_Comment, {
  foreignKey: 'user_id',
});

Blog_Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Blog_Post.hasMany(Blog_Comment, {
  foreignKey: 'blog_post_id',
});

Blog_Comment.belongsTo(Blog_Post, {
  foreignKey: 'blog_post_id',
});

module.exports = { User, Blog_Comment, Blog_Post };