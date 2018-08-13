exports.login = async (ctx, next)=>{ 
    let title = 'hello koa2', name = "登录";
    await ctx.render('login', {
        title,
        value: name,
    })
}

exports.register = async (ctx, next)=>{
    const name = "注册"
    await ctx.render('register', {
        value: name,
    })
}