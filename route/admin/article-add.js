const {Article} = require('../../model/article')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs');


module.exports = async (req, res) => {
    // console.log(req.body);
    const form = new formidable.IncomingForm({ 
        multiples: true, 
        uploadDir: path.join(__dirname,'../','../', 'public', 'uploads'),
        keepExtensions: true
    });

    form.parse(req, async (err, fields, files) => {
        // console.log(fields, files)
        if(files.cover.size<1){
            fs.unlink(files.cover.filepath,() => {
            })
        }
        await Article.create({
            title: fields.title,
            author: fields.author,
            content: fields.content,
            cover: files.cover.size>1? files.cover.filepath.split('public')[1]:'',
        })
        res.redirect("/admin/article")
    })
}