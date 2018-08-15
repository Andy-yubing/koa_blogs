const staticCache = require('koa-static-cache');
const path = require("path");



module.exports = (app)=>{
    app.use(staticCache(path.join(__dirname, '../static'), {
        maxAge: 365 * 24 * 60 * 60,
        dynamic: true,
    }))
    
}