const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const joi = require('joi');
const config = require('config')

const userSchema = mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('users', userSchema);

async function createUser(){
    let user = await User.findOne({ email: config.get('admin.email') })
    if (!user){
        console.log('不存在管理员,根据default.json创建管理员账号')
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(config.get('admin.password'), salt);
        const user = await User.create({
            username: config.get('admin.username'),
            email: config.get('admin.email'),
            password: pass,
            role: "admin",
            state: 0
        });
    }else{
        console.log('存在管理员,管理员账户名:',user.username)
    }

}


validateUser = user => {
    const schema = joi.object({
        username: joi.string().min(2).max(20).required().error(new Error('用户名异常')),
        email: joi.string().email().required().error(new Error('邮箱异常')),
        password: joi.string().min(6).max(15).required().error(new Error('密码异常')),
        role: joi.string().valid('admin', 'normal').required().error(new Error('角色异常')),
        state: joi.number().valid(0, 1).required().error(new Error('状态值异常'))
    });
    return  schema.validateAsync(user) 
}

module.exports ={
    User,
    validateUser,
    createUser
}