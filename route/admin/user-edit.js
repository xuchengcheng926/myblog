const {User, validateUser} = require('../../model/user')
const bcrypt =  require('bcrypt')

module.exports = async (req, res) => {
    try {
        await validateUser(req.body)
    }catch (err) {
        console.log(err.message)
        return  res.redirect("/admin/user")
    }
    const {id} = req.query;
    const user = await User.findOne({_id:id})
    if (user) {
        // console.log(user._id)
        if(req.body.password == "******") {
            await User.updateOne({_id: user._id}, {
                username: req.body.username,
                email: req.body.email,
                role: req.body.role,
                state: req.body.state
            })
        }else{
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt)
            await User.updateOne({_id: user.id}, req.body)
        }
    }
    res.redirect("/admin/user")
}

