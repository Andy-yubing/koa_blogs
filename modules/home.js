exports.homepage = async (ctx,next) => { 
    let name = "首页", link = "/less/index.css";
    await ctx.render('home', {
        value: name,
        link,
    })
}