const createTable = require("./createTable")
const mysql = require("mysql");
// 创建数据池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
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

const createTbale = (sql) => {
    query(sql, []);
}

createTbale(createTable.users);

createTbale(createTable.article);



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