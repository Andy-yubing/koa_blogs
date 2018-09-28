const moment = require("moment");
var log = require('koa-log4').getLogger("home");
exports.homepage = async (ctx,next) => { 
    let name = "首页", link = "/less/home.css";
    await ctx.render('home', {
        value: name,
        link,
    })  
}

exports.publish = async (ctx, next) => {
    let data = {
        title: ctx.request.body.title,
        value: ctx.request.body.value,
        sign: ctx.request.body.sign,
        author: ctx.request.body.author
    }
    if (data.title && data.value){
        await sql.inserArticle([data.title, data.value, moment().format('YYYY-MM-DD, H:mm:ss'), data.sign, data.author]).then((res)=>{
           log.info(res)
           ctx.body = { data, msg: "成功", sign:1 }    
        }).catch(err=>{
            log.error(err)
            ctx.body = { data: err, msg: "失败喽", sign: 0 }
        })
    }else{
        log.debug("没有传来东东")
        ctx.body = { data: "", msg: "没有传来东东", sign: 0 } 
    }
}

exports.getAllData = async (ctx, next)=>{
    await sql.findArticleByAll().then(res => {
        log.info(res);
        ctx.body = { data: res, msg: "成功", sign: 1 }
    }).catch(err=>{
        log.error("错加私了")
        ctx.body = { msg: "错喽", sign: 0 };
    })
}

exports.changeSign = async (ctx,next)=> { 
    let data = {
        signId: ctx.request.body.signId,
        sign: ctx.request.body.sign,
    }

    if (data.signId && data.sign){
        await sql.updateArticleBySign(data.sign, data.signId).then(res=>{
            log.info(res);
            ctx.body = { data: res, msg: "成功", sign: 1 };
        }).catch(err=>{
            log.error(err);
            ctx.body = { data: err, msg: "败喽", sign: 0 };
        })
    }

}


exports.deleteArticleById = async (ctx,next)=>{
    let data = {
        id: ctx.request.body.id,
    }
    if(data.id){
        await sql.deleteArticleById(data.id).then(res => {
            log.info(res);
            ctx.body = { data: res, msg: "成功", sign: 1 };
        }).catch(err => {
            log.error(err);
            ctx.body = { data: err, msg: "败喽", sign: 0 };
        })
    }
}