const express = require('express');

const userInfo = express.Router();

userInfo.get('/', (req, res) => {
    // console.log(req.session)
    req.app.locals.user = req.session.user
    if(req.session.user && req.session.user.role == "admin"){
        res.redirect('/admin/user')
    }else{
        res.render('userInfo/userInfo')
    }
})


module.exports = userInfo;