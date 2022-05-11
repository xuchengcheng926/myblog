const mysql = require('mysql')
const {Article} = require('./article')
require('./connect');

MYSQL_CONFIG = {
    host: '127.0.0.1',
    user: 'root',
    password: 'shuye72',
    port: 3306,
    database: 'demo'
}

const connection = mysql.createConnection(MYSQL_CONFIG);
connection.connect()

function query(conn,sql,params = []) {
   
    return new Promise((resolve,reject) =>{
        conn.query(sql,params,(err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    })
}
async function getdata(pageNum){
    let sql = `select * from works where cate_name=? limit ?, 10 `
    let res = await query(connection, sql, ['插画', pageNum])
    console.log(res)
    res.forEach(async (val) => {
        await Article.create({
            title: val.title,
            author: '627a63baca38211fea1332f8',
            content: val.describtion,
            cover: val.image_url,
        })
    })

}
for (let i = 0; i < 477; i++){
    console.log(10*i)
    getdata(10*i)
}

// module.exports = {
//     getdata
// }
