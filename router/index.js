const Router = require('koa-router');
const router = new Router();
const begin = require('../modules/begin')

// module.exports = router.get("/", begin.login);

router.get("/", begin.login);

module.exports = router;