const {User} = require('../../model/user')

module.exports = (req, res) => {
    if (req.session.user){
        return res.redirect('/admin/user')
    }
    res.render('admin/login')
}