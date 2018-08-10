exports.login = async (ctx, next)=>{ 
    console.log(ctx);
    let title = 'hello koa2'
    await ctx.render('index', {
        title,
    })
}

exports.register = function () {

}