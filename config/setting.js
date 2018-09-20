const staticCache = require('koa-static-cache');
const path = require("path");
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
var midlog = require('midlog')
const config = require('../config')
const intercept = require("./intercept")


let store = new MysqlSession({
    user: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
})
let cookie = {
    maxAge: 7200000, // cookie有效时长 cookie的过期时间，这里表示2个小时 
    expires: '',  // cookie失效时间
    path: '', // 写cookie所在的路径
    domain: '', // 写cookie所在的域名
    httpOnly: true, // 是否只用于http请求中获取
    overwrite: true,  // 是否允许重写
    secure: '',
    sameSite: '',
    signed: true,
}
/**
 * midlog日志系统   https://cloud.tencent.com/developer/article/1061894
 */
let firstValve = midlog({
    env: 'online',
    exportGlobalLogger: true,
    appender: [{
        type: 'INFO',
        logdir: path.join(__dirname,'../log/midlog'),
        pattern: '%d %r %x{name}:%z %p - %m%n',
        rollingFile: false,
        duation: 60000,
        name: 'info.log',
        nameformat: '[info.]HH-mm-ss[.log]',
        tokens: {
            name: 'tokens_INFO'
        },
        cacheSize: 5 * 1024 * 1024,
        flushTimeout: 15000
    }, {
        type: 'ERROR',
        logdir: path.join(__dirname,'../log/midlog'),
        pattern: '%d %r %x{name}:%z %p - %m%n',
        rollingFile: false,
        duation: 60000,
        name: 'error.log',
        nameformat: '[info.]HH-mm-ss[.log]',
        tokens: {
            name: 'tokens_ERROR'
        },
        cacheSize: 10240,
        flushTimeout: 10000
    }, {
        type: 'TRACE',
        logdir: path.join(__dirname,'../log/midlog'),
        pattern: '%d %r %x{name}:%z %p - %m%n',
        rollingFile: false,
        duation: 60000,
        name: 'trace.log',
        nameformat: '[info.]HH-mm-ss[.log]',
        tokens: {
            name: 'tokens_TRACE'
        },
        cacheSize: 5 * 1024 * 1024,
        flushTimeout: 10000
    }]
});
//logger.info('i am the global logger'); //全局调用 


module.exports = (app)=>{
    app.use(firstValve);
    // 业务中间件
    
    app.use(staticCache(path.join(__dirname, '../static'), {
        maxAge: 365 * 24 * 60 * 60,
        dynamic: true,
    }))
    app.use(bodyParser({
        formLimit: '1mb',
    }));
    
    // 使用session中间件
    app.use(session({
        key: 'SESSION_ID',
        store: store,
        cookie: cookie
    }))
    
    
}




