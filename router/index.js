const Router = require('koa-router');
const router = new Router();
const sql = require('../sql/mysql');
const sql2 = require('../sql/mysql2');
const begin = require('../modules/begin');
const test = require('../textMysql/test');
const home = require("../modules/home");
const middleware = require("../modules/middleware")
global.sql = sql;
global.sql2 = sql2;


//拦截器 客户端没有禁用cookie
const checkLogin = async (ctx, next) => {
    console.log("ctx" ,ctx);
    const allowpage = ['/login', '/register'], allowPost = ['/loginPost','/register'];
    let url = ctx.url;
    if (ctx.session.user_id) {
        if (ctx.method == "POST"){
            await next();
        }else{
            if (url === "/login") {
                ctx.redirect('/home');
                return false;
            }else{
                //可以添加
                await next();
            }
        }
    } else {
        if (allowpage.indexOf(url) > -1) {
            await next();
            return false;
        } else {
            if (ctx.method=="POST"){
                console.log('allowPost',allowPost.indexOf(url))
                if (allowPost.indexOf(url) > -1){
                    await next();
                }else{
                    ctx.body={
                        code: 4,
                        msg: "没有登录",
                        data: "",
                        token: ""
                    }
                }
            }else{
                let link = "/less/index.css";
                await ctx.render('404', {
                    link,
                })
            }
        }
    }
}

//router.all("*",checkLogin);
//页面
router.get("/",async (ctx, next)=>{
    ctx.redirect('/login')
})

router.get("/login",begin.login);
router.get("/register", begin.register);
router.get("/test", test.one);
router.get("/home",home.homepage)
router.get("/quit", async (ctx,next)=>{
    ctx.session = {};
    ctx.redirect('/login')
})

//业务处理
router.post("/register", begin.registerPost)
router.post("/loginPost", begin.loginPost)
// router.all("*", async (ctx, next) => {
//     console.log("aa", ctx);
//     next();
// })

module.exports = router;