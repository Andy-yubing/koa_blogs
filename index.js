const Koa = require('koa');
const path = require("path")
const views = require('koa-views')

// const serve = require('koa-static');
const ejs = require("ejs");
const setting = require("./config/setting");
const router = require("./router");
const app = new Koa();
const middleware = require("./modules/middleware")
console.log(middleware );

setting(app);

app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

// console.log(router);

app.use(router.routes());
// app.use(router.routes()) .use(router.allowedMethods());// 返回匹配路由的复合中间件

app.listen(8900,(err)=>{
    if(err){
        throw err;
    }
    console.log("listening at port 8900 supervisor");
})

