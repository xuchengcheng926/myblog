const {User, validateUser} = require('../../model/user')
const bcrypt =  require('bcrypt')

module.exports = async (req, res) => {
    try {
        await validateUser(req.body)
    }catch (err) {
        return res.redirect("/admin/user-editPage?message="+err.message)
    }
    user =  await User.findOne({ email: req.body.email })
    if (!user){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt)
        // console.log(req.body)
        await User.create(req.body)
        res.redirect('/admin/user');
    }else{
        res.redirect("/admin/user-editPage?message="+"当前用户已经存在")
    }

}