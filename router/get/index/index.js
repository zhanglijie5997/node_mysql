const template = require("../../../utils/utils");

const status = require("../../../utils/code");

const mysql = require("../../../config/confis");

const { getAccessToken, authorization } = require("../../../config/wx/wx");

const index = async (ctx, next) => {
    let test = [];
    try {
        test = await mysql('SEACHUSER', {
            email: 'test@160.com',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAMTYwLmNvbSIsInBhc3N3b3JkIjoienhjMTIzIiwiaWF0IjoxNTg1NTcwMzI2LCJleHAiOjE1ODU2OTk5MjYsImlzcyI6InpoYW5nbGlqaWUifQ.ge7IJNRJ1ROL1DwwO6TG0Bug2h9ctsjv6vODlDZvA0U'
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