const express = require('express')
const {SuccessModel, ErrorModel} = require('./src/Model/responseModel')
const url = require('url')
const fs = require('fs')
const request = require('request')
const SERVE_CONFIG = require('./src/config/serve')

const mysql = require('mysql')
const { MYSQL_CONFIG } = require('./src/config/db')

const connection = mysql.createConnection(MYSQL_CONFIG);
connection.connect();

const targetHost = 'http://i-ogp.pximg.net'
var targetOptions = {
    timeout: SERVE_CONFIG.PROXY_TIMEOUT,
    encoding: null,
    proxy: SERVE_CONFIG.PROXY,
    Headers: {
        'User-Agent': '',
    }
};

const app = express()
app.listen(SERVE_CONFIG.PORT, SERVE_CONFIG.HOST, () => {
    console.log('listening on port ' + SERVE_CONFIG.PORT)
})

app.use('/static', express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    const data = fs.readFileSync('./static/index.html', 'utf8')
    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8'})
    res.end(data)
})

app.get('/c/*', (req, res) => {
    targetOptions.Headers['User-Agent'] = req.headers['user-agent'],
    console.log(targetHost + req.originalUrl.substring(2))
    request.get(targetHost + req.originalUrl.substring(2), targetOptions, (error, response, body) => {
        if (error) {
            console.log('over')
            res.writeHead(404, {})
            res.end()
            return
        }
        res.header('content-Type','image/jpeg')
        res.send(body);
        res.end();
    })
})

const handleRoute = (req, res) => {
    const page = req.parse.page || '';
    pageNum = ( parseInt(page)-1 ) * 5
    let sql = `select * from works where cate_name=? limit ?, 5 `
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, ['插画', pageNum],(err, res) => {
            if (err) {
                reject(null);
            }else {
                for(var i = 0; i < res.length; i++) {
                    const params = url.parse(res[i].image_url, true)
                    res[i].image_url = SERVE_CONFIG.OUTHOST + params.pathname
                    // console.log(res[i].image_url,params)
                }
                resolve(res);
            }
        })
    })
    return promise.then((lisData) => {
        if (lisData){
            return new SuccessModel(lisData)
        }
            return new ErrorModel(lisData)
    })
}

app.get('/pic', (req, res) => {
    const params = url.parse(req.url, true);
    req.path = params.pathname || '/'
    
    if(params.search) {
        req.parse = params.query;
    }else {
        req.parse = null;
    }
    const DataPromise = handleRoute(req, res);

    DataPromise.then((data) => {
        res.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8'})
        console.log(req.url)
        res.end(JSON.stringify(data));
        return;
    })    
})

