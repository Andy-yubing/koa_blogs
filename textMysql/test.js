



exports.one = async (ctx,next)=>{
    let name = "注册", link = "/less/index.css";
    await ctx.render('test', {
        value: name,
        link,
    })
}