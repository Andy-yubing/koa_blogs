const moment = require("moment");
var log = require('log4js').getLogger("home");
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
    }
    if (data.title && data.value){
       await sql.inserArticle([data.title, data.value, moment().format('YYYY-MM-DD, h:mm:ss'), data.sign]).then((res)=>{
           log.info(res)
           ctx.body = { data, msg: "成功", sign:1 }    
        },err=>{ 
            log.error(err)  
            ctx.body = { data: err, msg: "失败喽", sign: 0 } 
        })
    }else{
        log.debug("没有传来东东")
        ctx.body = { data: "", msg: "没有传来东东", sign: 0 } 
    }
}

