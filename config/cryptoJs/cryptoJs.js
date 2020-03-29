const jsonwebtoken = require('jsonwebtoken');

const publicKey = 'set user info 134679852123';

/** 加密
 *  @param {object} password   加密对象
 *   |_ @param {string} email     邮箱
 *   |_ @param {string} password  密码
 */
const encry = (password) => jsonwebtoken.sign(password, publicKey, {
    expiresIn: '36h',
    issuer: 'zhanglijie'
});

/** 解密
 *  @param {string} token 解密值
 */
const decry = (token) => jsonwebtoken.verify(token, publicKey)

module.exports = {
    encry,
    decry
}