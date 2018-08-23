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




module.exports = {
    users,
    article,
}