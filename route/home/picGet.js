const request = require('request')
// 图片代理
const targetHost = 'http://i-ogp.pximg.net'
var targetOptions = {
    timeout: 8000,
    encoding: null,
    proxy: 'http://H9723uEzQK:ljesQqIotK@20.187.88.97:41026',
    Headers: {
        'User-Agent': '',
    }
};

module.exports = async (req, res) => {
    // console.log(req.query)
    targetOptions.Headers['User-Agent'] = req.headers['user-agent'],
    // console.log(targetHost + req.originalUrl.split('/pic')[1])
    request.get(targetHost + req.originalUrl.split('/pic')[1], targetOptions, (error, response, body) => {
        if (error) {
            console.log('over',error)
            res.writeHead(404, {})
            res.end()
            return
        }
        res.header('content-Type','image/jpeg')
        res.send(body);
        res.end();
    })
}