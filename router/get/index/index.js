const template = require("../../../utils/utils");

const status = require("../../../utils/code");

const mysql = require("../../../config/confis");

const { getAccessToken, authorization } = require("../../../config/wx/wx");

const index = async (ctx, next) => {
    let test = [];
    try {
        test = await mysql('SEACHUSER', {
            email: '13650653625@163.com',
            token: '840E91BAE37C57C1'
        }, 2);
        console.log(test, 'test');
    } catch (error) {
        test = [{
            message: '无此用户'
        }]
    }
    ctx.body = template(status['1001'], {
        message: test[0]
    });
    // ctx.response.redirect('http://www.baidu.com')
    await next();
}

module.exports = index;