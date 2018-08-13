const mysql = require('mysql')

// 创建数据池
const pool = mysql.createPool({
    host: '127.0.0.1',   // 数据库地址
    user: 'root',    // 数据库用户
    password: '123456',   // 数据库密码
  database: 'myblogs'  // 选中数据库
})

const query = async (sql,value) =>{
     // 在数据池中进行会话操作
    await pool.getConnection( (err, connection)=>{
        if (err){
            throw error;
        }else{
             connection.query(sql, value, (error, results, fields) => {
                // 如果有错误就抛出
                if (error) throw error;
                console.log(results, fields);
                // 结束会话
                connection.release();
            })
        }
     })
}

const createTbale = (sql) => {
    query(sql, []);
}

const users = `create table if not exists users(
        id INT NOT NULL AUTO_INCREMENT,
        phone VARCHAR(20) NOT NULL,
        name VARCHAR(30) NOT NULL,
        password VARCHAR(30) NOT NULL,
        avator VARCHAR(100) NOT NULL,
        moment VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
     )
;`

const article = `
     create table if not exists article(
         id INT NULL AUTO_INCREMENT,
         text VARCHAR(100) NOT NULL,
         
     )
;`