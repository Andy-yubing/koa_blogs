const Router = require('koa-router');
const router = new Router();
const sql = require('../sql/mysql');
const sql2 = require('../sql/mysql2');
const begin = require('../modules/begin');
const test = require('../textMysql/test')
global.sql = sql;
global.sql2 = sql2;
// module.exports = router.get("/", begin.login);

router.get("/", begin.login);
router.get("/register", begin.register);

router.get("/test", test.one);

router.post("/register", begin.registerPost)


module.exports = router;