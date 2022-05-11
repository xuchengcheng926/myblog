const {User} = require('../../model/user')

module.exports = async (req, res) => {
    req.session.destroy(()=>{
        res.clearCookie('cc')
        res.redirect('/admin/login')
    })
}