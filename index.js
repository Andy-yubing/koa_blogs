const Koa = require('koa');
const path = require("path")
const views = require('koa-views')

// const serve = require('koa-static');
const ejs = require("ejs");
const setting = require("./config/setting")
const router = require("./router")
const app = new Koa();

setting(app);

app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

app.use(router.routes())

app.listen(8900,(err)=>{
    if(err){
        throw err;
    }
    console.log("listening at port 8900 supervisor");
})

