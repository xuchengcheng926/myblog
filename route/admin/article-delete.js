const {Article} = require('../../model/article')
const fs = require('fs');
const path = require('path')

module.exports = async (req, res) => {
    console.log(req.query);
    const {id} = req.query
    if (id) {
        const article = await Article.findOne({_id: id})
        if(article.cover){
            console.log(path.join(__dirname,'../','../', 'public', article.cover))
            fs.unlink(path.join(__dirname,'../','../', 'public', article.cover),() => {
                
            })
        }
        await Article.deleteOne({_id: id})
    }
    res.redirect("/admin/article")
}