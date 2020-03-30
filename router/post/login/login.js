const mysql = require('../../../config/confis');

const { decry } = require('../../../config/cryptoJs/cryptoJs');

const template = require('../../../utils/utils');

const code = require('../../../utils/code')

const login = async (ctx, next) => {
    const { email, password } = ctx.request.body;
    if(!email) {
        ctx.body = template(code['1004'], {
            message: '请输入邮箱'
        })
    }
    if(!password) {
        ctx.body = template(code['1004'], {
            message: '请输入密码'
        })
    }
    
    try {
        const result = await mysql('GETUSERTOKEN', {email}, 5);
        const tokenDecry = decry(result[0].token);
        if(email === tokenDecry.email && password === tokenDecry.password ) {
            ctx.body = template(code['1001'], {
                message: '登录成功'
            })
        }else {
            if(email !== tokenDecry.email) {
                ctx.body = template(code['1001'], {
                    message: '账号错误'
                })
            };
            if(password !== tokenDecry.password) {
                ctx.body = template(code['1001'], {
                    message: '密码错误'
                })
            }
        }
    } catch (error) {
        ctx.body = template(code['1004'], {
            message: "账号不存在"
        })
    }
    await next();
};

module.exports = login;