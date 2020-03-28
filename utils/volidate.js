const template = require("./utils");

const mysql = require("../config/confis")

// token验证
const volidate = async (ctx, next) => {
    const { method, header, url } = ctx.request;
    // 查询用户
    const data = await mysql('SEACHUSER', {}, 2);
    const voliadtaArr = ['/changeUser']; // 需要验证的路由
    if(method === 'POST' || method === 'post') {
        const { authorization } = header;
        if(voliadtaArr.includes(url)) {
            // 取出token相同用户信息
            const user = data.filter(_ => _.token === authorization)[0];
            // 用户token相同,往下执行
            if(user && authorization === user.token) {
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