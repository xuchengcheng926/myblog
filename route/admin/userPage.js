const {User} = require('../../model/user')
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    req.app.locals.user = req.session.user
    const page = req.query.page||1;

    let users = await pagination(User).find().page(page).size(10).display(6).exec();
    res.render('admin/user', {
        users,
        activeSide: "userManage"
    })
}
