const md5 = require('md5');
const moment = require("moment");
const fs = require("fs");
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
    //console.log(ctx.request.body, sql);
    let user = {
        phone: ctx.request.body.phone,
        name: ctx.request.body.name,
        password: ctx.request.body.password,
        repeatpass: ctx.request.body.repeatpass,
        img: ctx.request.body.avator,
    }
    
    await sql.findDataByName(user.name).then(result=>{
        console.log(result)
        if (result.length){
            try {
                throw Error(`用户名已经存在`)
            } catch (err) {
                console.log(err);
            }
            ctx.body = {
                data: 1
            };
        } else if (user.password !== user.repeatpass || user.name == ""){
            ctx.body = {
                data: 2,
            };
        }else{
            let base64Data = user.img.replace(/^data:image\/\w+;base64,/, "");
            if (!base64Data){
                ctx.body = {
                    data: 2,
                };
                return false;
            }
            let dataBuffer = new Buffer(base64Data, 'base64');
            let getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now();
            let upload = async ()=>{
                try {
                    await fs.writeFile('./static/images/' + getName + '.png', dataBuffer, err => {
                        if (err) {
                            throw err;
                        };
                        ctx.body = {
                            data: 3
                        };
                        sql.insertData([user.phone, user.name, md5(user.password), getName + '.png', moment().format('YYYY-MM-DD, h:mm:ss')])
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            
        }
    })
}

