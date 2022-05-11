const {Article} = require('../../model/article')
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    req.app.locals.user = req.session.user
    // console.log(req.query)
    const {page} = req.query || 1 
    let articles = await pagination(Article).find().sort({publishDate: -1}).page(page).size(10).display(6).populate('author').exec();
    // populate函数未知错误
    articles = JSON.stringify(articles);
    articles = JSON.parse(articles);
    // console.log(articles.records)

    // he
    res.render('admin/article', {
        articles,
        activeSide: "articleManage"
    })
}


