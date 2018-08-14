const Router = require('koa-router');
const router = new Router();
const sql = require('../sql/mysql');
const begin = require('../modules/begin');
global.sql = sql;

// module.exports = router.get("/", begin.login);

router.get("/", begin.login);
router.get("/register", begin.register);

router.post("/register", begin.registerPost)

module.exports = router;