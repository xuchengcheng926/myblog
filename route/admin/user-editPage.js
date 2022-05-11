const {User} = require('../../model/user')

module.exports = async (req, res) => {
    const {message, id} = req.query;
    req.app.locals.user = req.session.user

    if (id){
        editUser = await User.findOne({_id:id})
        res.render('admin/user-edit',{
            activeSide: 'userManage',
            urlAction: '/admin/user-edit?id='+id,
            current_title: '修改用户数据',
            message,
            editUser
        })
    }else{
        res.render('admin/user-edit',{
            activeSide: 'userManage',
            urlAction: '/admin/user-add',
            current_title: '创建用户',
            message
        })
    }
}