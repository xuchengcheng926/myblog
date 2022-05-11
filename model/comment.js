const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'articles',
        require: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
    }
})

const Comment = mongoose.model('comment', commentSchema)
// Article.create({
//     title: 'test4',
//     author: '6278c9bec1cf37b3cda32afe',
//     content: 'sajdiasjkdashj'
// })
module.exports = {
    Comment
}
