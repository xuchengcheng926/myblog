const {Article} = require('../../model/article')
const {Comment} = require('../../model/comment')


module.exports = async (req, res) => {
    const {id} = req.query;
    req.app.locals.user = req.session.user
    
    req.app.locals.aid = id
    req.app.locals.uid = req.session.user? req.session.user._id : null
    // console.log(req.app.locals.aid, req.app.locals.uid)

    let article = null;
    let comments =null;
    if (id) {
        article = await Article.findOne({_id:id}).populate('author')
        if (article.cover.search('i-ogp.pximg.net')>=0){
            article.cover = "/home/pic" + article.cover.split('i-ogp.pximg.net')[1]        
        }

        // populate函数未知错误
        article = JSON.stringify(article);
        article = JSON.parse(article);

        comments = await Comment.find({aid:id}).populate('uid')
        // populate函数未知错误
        comments = JSON.stringify(comments);
        comments = JSON.parse(comments);
        // console.log(comments)
    }
    res.render('home/article.art',{
        comments,
        article,
        commentLink: '/home/comment?'
    })
}