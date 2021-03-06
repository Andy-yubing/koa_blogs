const staticCache = require('koa-static-cache');
const path = require("path");
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
var morgan = require('morgan');
//const logConfig = require('./logConfig');
const koalog4 = require('koa-log4')
const config = require('../config');
const intercept = require("./intercept")
require("./log4jsConfig");
// var winston = require('./winston');
const logger = koalog4.getLogger('app')

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

module.exports = (app)=>{
    app.use(koalog4.koaLogger(koalog4.getLogger("http"), { level: 'auto' }))
    app.use(function* (next) {
        var start = new Date()
        yield next
        var ms = new Date() - start
        logger.info('%s %s - %s', this.method, this.url, ms)
    })
    
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



