const mysql = require('../../../config/confis');

const login = async (ctx, next) => {
    const data = await mysql()
    await next();
};

module.exports = login;