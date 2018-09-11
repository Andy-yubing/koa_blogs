const jwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jsonwebtoken.verify)
module.exports = (app)=>{

    app.use(async (ctx, next)=>{
        console.log("haha", ctx)
        try {
            //const token = ctx.header.authorization  // 获取jwt
            const token = ctx.query.token
            console.log('获取token', token)
            if (token) {
                let payload
                try {
                    //payload = await verify(token.split(' ')[1], "andy")  // 解密payload，获取用户名和ID
                    payload = await verify(token, "andy") 
                    console.log('payload', payload);
                    ctx.user = {
                        name: payload.name,
                        id: payload.id
                    }
                } catch (err) {
                    console.log('token verify fail: ', err)
                }
            }
            console.log(`token: ${token}`)
            await next()
        } catch (err) {
            console.log("err", err.status)
            if (err.status === 401) {
                ctx.body = {
                    code: -1,
                    message: '认证失败'
                }
            } else {
                err.status = 404
                ctx.body = '404'
                console.log('不服就是怼：', err)
            }
        }
    })

    app.use(jwt({ secret: "andy" }).unless({
        path: [/^\/api\/login/, /^\/api\/createUser/, /^\/login/, /^\/register/, /^\/loginPost/, /^\/favicon.ico/]}))
}