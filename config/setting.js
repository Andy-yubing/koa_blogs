const staticCache = require('koa-static-cache');
const path = require("path");
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const config = require('../config')

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




// //定义允许直接访问的url
// const allowpage = ['/login', '/register']
// //拦截
// function localFilter(ctx) {
//     console.log(ctx,ctx.request.url)
//     let url = ctx.originalUrl;
//     if (ctx.session.user_id) {
//         if (url === "/login") {
//             ctx.redirect('/home')
//         }
//         console.log('login status validate success')
//     }else{
//         if (allowpage.indexOf(url) > -1) {
//             //logger.info('当前地址可直接访问')
//             console.log('当前地址可直接访问');
//         } else {
//             console.log('login status validate fail')
//             ctx.redirect('/login')
//         }
//     } 
    
// }