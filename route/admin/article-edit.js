const {Article} = require('../../model/article')
const formidable = require('formidable')
const path = require('path')

module.exports = async (req, res) => {
    const {id} =  req.query
    const article = await Article.findOne({_id: id})

    if(article){
        const form = new formidable.IncomingForm({ 
            // multiples: true, 
            uploadDir: path.join(__dirname,'../','../', 'public', 'uploads'),
            keepExtensions: true
        });
    
        form.parse(req, async (err, fields, files) => {
            // console.log(fields)
            await Article.updateOne({_id: id},{
                title: fields.title,
                publishDate: fields.publishDate,
                content: fields.content,
                cover: files.cover.size>1? files.cover.filepath.split('public')[1]:'',
            })
            res.redirect("/admin/article")
        })
    }else{
        res.redirect("/admin/article")
    }

}