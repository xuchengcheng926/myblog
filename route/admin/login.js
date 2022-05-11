const {User} = require('../../model/user');
const bcrypt =require('bcrypt');

module.exports = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({email:username})
    if (user) {
        isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            req.session.user = user
            res.redirect("/admin/user")
        }else {
            res.send('密码错误')
        }
    }else{
        res.send("不存在用户")
    }

    // res.send(user)
}