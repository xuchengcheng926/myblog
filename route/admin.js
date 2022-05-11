const express = require('express');

const admin = express.Router();

// 登陆
admin.get('/login', require('./admin/loginPage'))
admin.post('/login', require('./admin/login'))
admin.get('/logout', require('./admin/logout'))

// 用户管理
admin.get('/user', require('./admin/userPage'))
admin.get('/user-editPage', require('./admin/user-editPage'))
admin.post('/user-add', require('./admin/user-add'))
admin.get('/user-delete', require('./admin/user-delete'))
admin.post('/user-edit', require('./admin/user-edit'))

// 文章管理
admin.get('/article', require('./admin/articlePage'))
admin.get('/article-editPage', require('./admin/article-editPage'))
admin.post('/article-add', require('./admin/article-add'))
admin.get('/article-delete', require('./admin/article-delete'))
admin.post('/article-edit', require('./admin/article-edit'))
module.exports = admin;