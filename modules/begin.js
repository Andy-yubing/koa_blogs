const md5 = require('md5');
const moment = require("moment");
const fs = require("fs");
const jsonwebtoken = require('jsonwebtoken')

exports.login = async (ctx, next)=>{ 
    console.log("12345678");
    let  name = "登录", link ="/less/index.css";
    await ctx.render('login', {
        value: name,
        link, 
    })
}



exports.loginPost = async (ctx,next)=>{
    let user = {
        name: ctx.request.body.name,
        phone: ctx.request.body.phone,
    }
    
    if (user.name !== "" && user.phone !== ""){
        
        await sql.findUsersByName(user.name).then(result=>{
            console.log(result);
           
            if(result.length>0){
                ctx.session = {
                    user_id: Math.random().toString(36).substr(2),
                    count: 0
                }
                const userToken = {
                    name: user.name,
                    id: result[0].id
                }
                const token = jsonwebtoken.sign(userToken, "andy", { expiresIn: '1h' })  // 签发token
                ctx.session.count = ctx.session.count + 1;
                //console.log(ctx.session);
                //logger.info("签发token", token)
                ctx.body = {
                    code: 1,
                    msg: "成功",
                    data: result,
                    token
                }
                //ctx.redirect('/home')
            } else if (result.length==0){
                ctx.body = {
                    code: 2,
                    msg: "账户信息为空",
                    data: result,
                    token:'',
                }
            }else{
                ctx.body = {
                    code: 3,
                    msg: "账户信息报错",
                    data: result,
                    token:''
                }
            }
        },err=>{
            console.log(err);
            //logger.error(err);
        })
    }else{
        ctx.body = {
            code: 0,
            msg:"用户名或密码为空"
        }
    }
}

exports.register = async (ctx, next)=>{
    let name = "注册", link = "/less/index.css";
    await ctx.render('register', {
        value: name,
        link, 
    })
}

exports.registerPost = async (ctx, next)=>{
    // console.log(ctx.request.body, sql);
    let user = {
        phone: ctx.request.body.phone,
        name: ctx.request.body.name,
        password: ctx.request.body.password,
        repeatpass: ctx.request.body.repeatpass,
        img: ctx.request.body.avator,
    }
    
    await sql.findUsersByName(user.name).then(result=>{
        console.log(result)
        if (result.length){
            try {
                throw Error(`用户名已经存在`)
            } catch (err) {
                console.log(err);
                //logger.error(err);
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
            // let upload = new Promise((resolve, reject)=>{
            //         fs.writeFile('static/images/' + getName + '.png', dataBuffer, err => {
            //             if (err) {
            //                 reject(err)
            //             };
            //             resolve(true)
            //         });
            // })
            // upload.then(value=>{
            //     ctx.body = {data: 3};
            //     sql.insertData([user.phone, user.name, md5(user.password), getName + '.png', moment().format('YYYY-MM-DD, h:mm:ss')])
            // },err=>{
            //     console.log(err)
            // })
            async function upload(){
                    await fs.writeFile('static/images/' + getName + '.png', dataBuffer, err => {
                        if(err){
                            //logger.error(err);
                            throw new Error(err);
                        }
                    });    
            }
            upload().then(() => { 
                ctx.body = { data: 3 } 
                sql.insertUsers([user.phone, user.name, md5(user.password), getName + '.png', moment().format('YYYY-MM-DD, H:mm:ss')])
            }).catch(err => console.log(err));
        }
    })
}

