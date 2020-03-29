const mysql  = require("mysql");

const config = {
    HOST: 'localhost',
    DATABASES: 'sql_test',
    USER: 'root',
    PASSWORD: '123456'
};

// sql 操作
const sqlObj = {
    // 查询用户
    'SEACHUSER': (email, token) => {
        return 'SELECT name, email FROM sql_test.user WHERE (`email` = "'+ email +'") and (`token` = "'+ token +'"  );'
    },
    // 更新用户信息
    'UPDATAUSER': (email, name) => {
        let sql = "UPDATE `sql_test`.`user` SET `name` = '"+ name +"' WHERE (`email` = '"+ email +"');";
        return sql;
    },
    // 添加用户
    'ADDUSER': (email, name, token) => {
        return "INSERT INTO `sql_test`.`user` (`name`, `email`, `token`) VALUES ('"+ name +"', '"+ email +"', '"+ token +"')"
    },
    // 删除数据
    'DELETEUSER': (id, token) => {
        return "DELETE FROM `sql_test`.`text` WHERE (`id` = '"+ id +"') and (`token` = '"+ token +"')";
    },
    // 搜索用户是否存在
    'HAVEUSER': (email, token) => {
        // return 'SELECT name, email FROM sql_test.user WHERE (`email` = '+ email +') and (`token` = '+ token +');'
        return 'SELECT name, email FROM sql_test.user WHERE (`email` = "'+ email +'");'
    },
    // 获取用户token, 解密
    'GETUSERTOKEN': (email) => "SELECT token FROM sql_test.user WHERE (`email` = '"+ email +"');"
};

const connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASES
});

connection.connect((err, result) => {
    if(err) {
        console.log(`err 🥱 !!`);
        throw err;
    };
    console.log(`mysql connect success 🚀!!`);
});

/** 数据库操作
 *  @param {string} name     sql名称
 *  @param {object} params   插入，修改删除对象
 *  @param {number} status   0 => 增 1 => 删  2 => 查 3 => 改
 */
const sqlFn = async (name, params, status) => {
    return await new Promise((res, rej) => {
        switch (status) {
            case 0:
                connection.query(sqlObj[name](params.email, params.name, params.token), (err, result) => {
                    if(err) throw err;
                    res(result) ;
                });
                break; 
            case 1:
                break;
            case 2:
                connection.query(sqlObj[name](params.email, params.token), (err, result) => {
                    if(err) throw err;
                    res(result);
                });
                break;
            case 3:
                connection.query(sqlObj[name]( params.email, params.name, params.token), (err, result) => {
                    if(err) throw err;
                    res(result);
                });
                break;
            case 4:
                connection.query(sqlObj[name]( params.email,params.token), (err, result) => {
                    if(err) throw err;
                    res(result);
                });
                break;
            case 5: 
                connection.query(sqlObj[name](params.email), (err, result) => {
                    if(err) throw err;
                    res(result);
                });
                break;
            default:
                console.log(params);
                connection.query(sqlObj[name]( params.email, params.token), (err, result) => {
                    if(err) throw err;
                    res(result);
                });
                break;
        }
    })
};

module.exports = sqlFn;