const staticCache = require('koa-static-cache');
const path = require("path");
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
var morgan = require('morgan');
//var midlog = require('midlog')
const config = require('../config')
const intercept = require("./intercept")
var winston = require('./winston');
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

// loger.log('日志')
// loger.trace('追踪')
// loger.debug('调试信息')
// loger.info('提示信息')
// loger.warn('警告')

// loger.error('错误')
// loger.fatal('致命错误')

// logger.info('test info 1')
// errlogger.error('test error 1')
// othlogger.trace('test trace 2')
// reqlogger.info("请求info")
module.exports = (app)=>{
    //log4js.useLogger(app, logger);
    // 业务中间件
    // /app.use(morgan('combined'));
    app.use(morgan('combined', { stream: winston.stream }));
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



