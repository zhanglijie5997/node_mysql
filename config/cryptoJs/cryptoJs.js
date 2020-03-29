const jsonwebtoken = require('jsonwebtoken');

const publicKey = 'set user info 134679852123';

const encry = (password) => jsonwebtoken.sign(password, publicKey, {
    expiresIn: '36h',
    issuer: 'zhanglijie'
});


module.exports = {
    encry
}