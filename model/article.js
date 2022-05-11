const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 200,
        require: [true,'无标题'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type:String,
        default: null
    },
    content: {
        type: String,
    }
})

const Article = mongoose.model('Article', articleSchema)
// Article.create({
//     title: 'test4',
//     author: '6278c9bec1cf37b3cda32afe',
//     content: 'sajdiasjkdashj'
// })
module.exports = {
    Article
}
