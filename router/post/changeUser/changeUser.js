const template = require("../../../utils/utils");

const sqlFn = require("../../../config/confis");

const code = require("../../../utils/code");

// 改变用户信息
const changeUser = async (ctx, next) => {
    const { email, name } = ctx.request.body;
    const { authorization } = ctx.request.header;
    const data = await sqlFn('UPDATAUSER',{
        email,
        name,
        token: authorization
    }, 3);
    const status = data ? code['1001'] : code['1004'];
    const message = data ? '修改成功':'修改失败'
    ctx.body = template(status, {
        message
    });
    await next();
}

module.exports = changeUser;