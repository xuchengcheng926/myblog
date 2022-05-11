const {Article} = require('../../model/article')
const pagination = require('mongoose-sex-page');


module.exports = async (req, res) => {
    const {page} = req.query;
    req.app.locals.user = req.session.user

    let articles = await pagination(Article).find().sort({publishDate: -1}).page(page).size(5).display(10).populate('author').exec();
    articles.records.forEach(article =>{
        if (article.cover.search('i-ogp.pximg.net')>=0){
            article.cover = "/home/pic" + article.cover.split('i-ogp.pximg.net')[1]        
        }   
        // console.log(article.cover)
    })
    // populate函数未知错误
    articles = JSON.stringify(articles);
    articles = JSON.parse(articles);
    // console.log(articles)
    res.render('home/index.art',{
        articles,
        currentPage: '首页'
    })
}