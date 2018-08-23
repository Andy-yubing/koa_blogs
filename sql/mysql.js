const mysql = require('mysql')
// 创建数据池
const pool = mysql.createPool({
    host: 'localhost',   // 数据库地址
    user: 'root',    // 数据库用户
    password: '123456',   // 数据库密码
    port: '3306',
    database: 'myblogs'  // 选中数据库
})

const query = (sql, values)=>{
     // 在数据池中进行会话操作
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
}
// const query = async (sql, values)=>{
//      // 在数据池中进行会话操作
//      try {
//         pool.getConnection( function (err, connection) {
//              if (err) {
//                  throw err;
//              } else {
//             return connection.query(sql, values, (error, results, fields) => {
//                      // 结束会话
//                      connection.release()
//                      // 如果有错误就抛出
//                      if (error) throw error;
//                  })
//             }
//         })
//      } catch (error) {
//          console.log(err); // 这里捕捉到错误 `error`
//      }
// }

const createTbale = (sql) => {
    query(sql, []);
}

const users = `create table if not exists users(
        id INT NOT NULL AUTO_INCREMENT,
        phone VARCHAR(20) NOT NULL,
        username VARCHAR(30) NOT NULL,
        password VARCHAR(100) NOT NULL,
        img VARCHAR(100) NOT NULL,
        moment VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
     )
;`

const article = `
     create table if not exists article(
         id INT NOT NULL AUTO_INCREMENT,
         title VARCHAR(80) NOT NULL,
         value VARCHAR(100) NOT NULL,
         moment VARCHAR(100) NOT NULL,
         PV INT NOT NULL,
         pageView INT NOT NULL,
         PRIMARY KEY (id)
     )
;`

createTbale(users);
createTbale(article);

const insertData = (value) => {
    let _sql = `insert into users(phone,username,password,img,moment) values(?,?,?,?,?)`;
    return query(_sql, value)
}

const findDataByName = (value)=>{
    let _sql = `select * from users where username = "${value}"`;
    return query(_sql);
}



module.exports = {
    insertData,
    findDataByName,
}