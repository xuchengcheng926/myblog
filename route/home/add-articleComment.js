const {Comment} = require('../../model/comment')

module.exports = async (req, res) => {
    const {aid, uid, content} = req.body
    if (uid && aid) {
        if (content) {
            await Comment.create(req.body)
        }
        res.redirect('/home/article?id='+ aid)
    }else{
        res.redirect('/admin/login')
    }
}