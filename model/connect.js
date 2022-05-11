const mongoose = require('mongoose')
const {createUser} = require('./user')
const config = require('config')

mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.dbname')}`)
    .then(() => {
        console.log('数据库连接成功')
        // 创建默认管理用户
        createUser()
    })
    .catch(() => {console.log('数据库连接失败')})
