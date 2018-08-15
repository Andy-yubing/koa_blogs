

exports.login = async (ctx, next)=>{ 
    let  name = "登录", link ="/less/index.css";
    await ctx.render('login', {
        value: name,
        link, 
    })
}

exports.register = async (ctx, next)=>{
    let name = "注册", link = "/less/index.css";
    await ctx.render('register', {
        value: name,
        link, 
    })
}

exports.registerPost = async (ctx, next)=>{
    
}

