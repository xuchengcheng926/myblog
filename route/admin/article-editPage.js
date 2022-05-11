const {Article} = require('../../model/article')

module.exports = async (req, res) => {
    const {id} = req.query;
    req.app.locals.user = req.session.user

    // console.log(req.app.locals.user)
    if(id){
        const article = await Article.findOne({_id: id})
        // console.log(article)
        res.render('admin/article-edit.art',{
            article,
            activeSide: 'articleManage',
            pageTitle: '修改文章',
            link: '/admin/article-edit?id='+id,
        })
    }else{
        res.render('admin/article-edit.art',{
            activeSide: 'articleManage',
            pageTitle: '添加文章',
            link: '/admin/article-add',
        })
    }
}