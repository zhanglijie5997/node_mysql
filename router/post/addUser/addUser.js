const template = require("../../../utils/utils");

const mysql = require("../../../config/confis");

const code = require("../../../utils/code");

const addUser = async (ctx, next) => {
    
    const { name, email } = ctx.request.body;
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
            const data = await mysql('ADDUSER', {
                name,
                email,
                token: Date.now()
            }, 0);
            if(data) {
                ctx.body = template(code['1001'], {
                    message: '添加用户成功'
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