const {User} = require('../../model/user')

module.exports = async (req, res) => {
    const {id}  = req.query;
    // console.log(id)
    await User.deleteOne({_id: id})
    res.redirect('/admin/user')
}