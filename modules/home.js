const moment = require("moment");
exports.homepage = async (ctx,next) => { 
    let name = "首页", link = "/less/home.css";
    await ctx.render('home', {
        value: name,
        link,
    })  
}

exports.publish = async (ctx, next) => {
    console.log(ctx.request.body);
    let data = {
        title: ctx.request.body.title,
        value: ctx.request.body.value,
        sign: ctx.request.body.sign,
    }
    if (data.title && data.value){
       await sql.inserArticle([data.title, data.value, moment().format('YYYY-MM-DD, h:mm:ss'), data.sign]).then((res)=>{
           ctx.body = { data, msg: "成功", sign:1 }    
        },err=>{
            logger.error(err);
           ctx.body = { data: err, msg: "失败喽", sign: 0 }    
        })
    }else{
        ctx.body = { data: "", msg: "没有传来东东", sign: 0 } 
        logger.info("没有传来东东");
    }
    
}

