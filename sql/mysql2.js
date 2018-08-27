const table = require("./createTable")
//创建数据库
table.createTbale(table.users);
table.createTbale(table.article);
table.createTbale(table.runoob_tbl);


//注册用户
const insertData = function (value) {
    let _sql = "insert into users(phone,username,password,img,moment) values(?,?,?,?,?)";
    return table.query(_sql, value);
}

//通过名字查找用户
const findDataByName = function (name) {
    let _sql = `
        select * from users where username="${name}";
    `
    return table.query(_sql);
}
 
const insert_runoob_tbl = function (value) { 
    let _sql = `insert into runoob_tbl(title,value,tbdate) values (?,?,?)`;
    return table.query(_sql,value);
}
 

// insertData(['123', "haha", 'a123', 'aaqq', '1234'])

// insert_runoob_tbl(['123', "haha", "2017-08-19"])

// findDataByName("haha").then(result=>{
//     console.log(result);
// })

module.exports = {
    insertData,
    findDataByName,
}