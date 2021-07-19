# MVC Tech Blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
This is a CMS-style blog website where users can view and comment on any post, or create, update or delete their own blog posts. I used the `Handlebars` template engine with `Express` and `Node.js` to create the rendered web application, and `MySql` for the database.  I also used the `express-session` npm package to authenticate a user and store a session in a cookie.  This will cause the session to expire after a set amount of time, after which a user must log back in before certain actions are allowed (like adding, updating or deleting posts and/or comments). 

## Installation
Install `Node.js` - https://nodejs.org/en/download/package-manager/ 

`Express`, `dotenv`, `MySql2`, `Sequelize`, `Nodemon`, `bcrypt`, `express-session`, `express-handlebars` and `connect-session-sequelize` were installed through `npm install`.

## Usage
Users can view blog posts and their associated comments.  However, users must 'Sign in' or 'Sign up' in order to create, update or delete their own posts, comment on other users' posts, and update or delete their own comments.  Users can click on the 'Dashboard' link in the nav section to see their own posts or add a new post.  From 'Home' or the 'Dashboard', users can click on the post 'Title' to view 'Comments' as well as add one.  Users can update and/or delete their own comments by clicking on the comment text, which takes them to an 'Edit Comment' page.  Users cannot edit other user's comments, only their own.  However, when a user deletes one's own post, all associated comments will be deleted, regardless of the authors.  When users are done, they can click on the 'Logout' link in the nav section to log out of the application.

This server side application is deployed and can be accessed through Heroku.

## Language used
* `Javascript`

## Packages used
* `Express`
* `Dotenv`
* `MySql2`
* `Sequelize`
* `Nodemon`
* `Bcrypt`
* `Express-session`
* `Express-handlebars`
* `Connect-session-sequelize`

## Mock Up

![Tech Blog giphy](./Assets/TechBlog.gif)

## Link to Deployed Application

[Link to the deployed application in Heroku](https://mvc-cms-style-tech-blog.herokuapp.com/)

## MIT License

&copy;2021 Donna Crawford

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For questions, please contact:

- [Donna Crawford](https://github.com/Donnastjames)
