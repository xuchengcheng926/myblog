const express = require('express');

const home = express.Router();

home.get('/', require('./home/home'))
home.get('/article', require('./home/articleDetial'))
home.post('/comment', require('./home/add-articleComment'));
home.get('/pic/*', require('./home/picGet'))


module.exports = home;