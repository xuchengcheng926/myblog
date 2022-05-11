const express = require('express');
const path = require('path');
const home = require('./route/home');
const admin = require('./route/admin');
const template = require('art-template');
const moment = require('moment');
const bodyparser = require('body-parser');
const session = require('express-session');
const config = require('config')


// 连接数据库
require('./model/connect');

// 创建服务器对象
const app = express();

// session处理
app.use(session({
    secret: 'secret',
    name: 'cc',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 3600 * 24 
    }
}));

// 静态资源目录
app.use(express.static(path.join(__dirname,'public')));

// 处理请求参数和post上传
app.use(bodyparser.urlencoded({extended:false}));

// 设置渲染模板
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'art');
app.engine('art', require('express-art-template'));
template.defaults.imports.dataFormat = moment;

// admin权限管理
app.use('/admin', require('./middleware/loginGuard'))
app.get('/', (req, res) => {
    res.redirect('/home')
})
app.use('/home', home);
app.use('/admin', admin);

// 启动服务
app.listen(config.get("servePort"));
