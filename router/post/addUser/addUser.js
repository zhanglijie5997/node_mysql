const template = require("../../../utils/utils");

const mysql = require("../../../config/confis");

const code = require("../../../utils/code");

const { encry } = require("../../../config/cryptoJs/cryptoJs")

// 添加用户
const addUser = async (ctx, next) => {
    console.log(`2123`);
    const { name, email, password } = ctx.request.body;
    if(!name) {
        ctx.body = template(code['1004'], {
            message: '请输入正确用户名'
        })
    };

    if(!email) {
        ctx.body = template(code['1004'], {
            message: '请输入正确邮箱'
        })
    };

    try {
        const user = await mysql('SEACHUSER', {}, 2);
        const result = user.filter(_ => _.email === email);
        // 查询用户是否存在
        if(result && result.length > 0) {
            ctx.body = template(code['1004'], {
                message: '该用户已存在'
            })
        }else {
            // 生成jsonwebtoken对象
            const userMsg = {
                name,
                email,
                password
            };
            console.log(encry(userMsg));
            const data = await mysql('ADDUSER', {
                name,
                email,
                password,
                token: encry(userMsg)
            }, 0);
            if(data) {
                ctx.body = template(code['1001'], {
                    message: '注册成功'
                });
            }
        }
    } catch (error) {
        ctx.body = template(code['1004'], {
            message: ''
        });
    }
    await next();
}

module.exports = addUser;