const template = require("../../../utils/utils");

const status = require("../../../utils/code");

const mysql = require("../../../config/confis");

const { getAccessToken, authorization } = require("../../../config/wx/wx");

const index = async (ctx, next) => {
    // const data = authorization();
    const result = await mysql('SEACHUSER', {}, 2);
    ctx.body = template(status['1001'], {
        result
    });
    // ctx.response.redirect('http://www.baidu.com')
    await next();
}

module.exports = index;