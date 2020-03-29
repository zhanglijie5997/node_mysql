const template = require("./utils");

const mysql = require("../config/confis");

const { decry } = require("../config/cryptoJs/cryptoJs");

// token验证
const volidate = async (ctx, next) => {
    const { method, header, url } = ctx.request;
    const { email } = ctx.request.body;
    // 查询用户
    const result = await mysql('GETUSERTOKEN', {email}, 5);
    // const { password } = decry(result[0].token) ;

    const voliadtaArr = ['/changeUser']; // 需要验证的路由
    if(method === 'POST' || method === 'post') {
        const { authorization } = header;
        if(voliadtaArr.includes(url)) {
            // 取出token相同用户信息
            // const user = data.filter(_ => _.token === authorization)[0];
            // 用户token相同,往下执行
            if(authorization === result[0].token) {
                await next();
            }else {
                // token 过期
                ctx.body = template(10004, {
                    message: '登录凭证失效'
                })
            }
        }else {
            await next();
        }
    }else {
        await next();
    }
    
}

module.exports = volidate;