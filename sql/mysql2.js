const mysql = require("mysql");
// 创建数据池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblogs'
});

const query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                //console.log("asdaaaaaaaaaa__________错误");
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    //console.log("asdaaaaaaaaaa__________正确");
                    //console.log(values);
                    if (err) {
                        reject(err)
                    } else {
                        //console.log(rows);
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

query().then((value) => {
    //console.log(value);
}, (err) => {
    // console.log(err);
})

const createTbale = (sql) => {
    query(sql, []);
}

//建表
const users = `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
        phone VARCHAR(20) NOT NULL,
        username VARCHAR(30) NOT NULL,
        password VARCHAR(30) NOT NULL,
        img VARCHAR(100) NOT NULL,
        moment VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
);`

const article = `create table if not exists article(
         id INT NOT NULL AUTO_INCREMENT,
         title VARCHAR(80) NOT NULL,
         value VARCHAR(100) NOT NULL,
         moment VARCHAR(100) NOT NULL,
         PV INT NOT NULL,
         pageView INT NOT NULL,
         PRIMARY KEY (id)
     );`


createTbale(users);

createTbale(article);



//注册用户
const insertData = function (value) {
    let _sql = "insert into users(phone,username,password,img,moment) values(?,?,?,?,?)";
    console.log(value);
    return query(_sql, value);
}

//通过名字查找用户
const findDataByName = function (name) {
    let _sql = `
        select * from users where username="${name}";
    `
    return query(_sql);
}



module.exports = {
    insertData,
    findDataByName,
}