const mysql = require("mysql");
const config = require("../config")
// 创建数据池   密码: Yubing_123
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: 'text_1'
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
         PV INT UNSIGNED NOT NULL,
         pageView INT UNSIGNED NOT NULL,
         age TINYINT UNSIGNED NOT NULL,
         PRIMARY KEY (id)
);`

const runoob_tbl = `
    CREATE TABLE IF NOT EXISTS runoob_tbl(
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(60) NOT NULL,
        value VARCHAR(100) NOT NULL,
        tbdate DATE,
        PRIMARY KEY (id)
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;
`




module.exports = {
    query,
    createTbale,
    users,
    article,
    runoob_tbl
}