// var log4js = require('log4js');
const log4js = require('koa-log4')
const path = require('path')
const appDir = path.resolve(__dirname, '..')
const logDir = path.join(appDir, 'logs')
try {
    require('fs').mkdirSync(logDir)
} catch (e) {
    if (e.code != 'EEXIST') {
        console.error('Could not set up log directory, error was: ', e)
        process.exit(1)
    }
}

log4js.configure(path.join(appDir, 'log4js.json'), { cwd: logDir })

// log4js.configure({
//     "appenders": {
//         "access": {
//             "type": "dateFile",
//             "filename": "logs/access.log",
//             "pattern": "-yyyy-MM-dd",
//             "category": "http"
//         },
//         "app": {
//             "type": "file",
//             "filename": "logs/app.log",
//             "maxLogSize": 10485760,
//             "numBackups": 3
//         },
//         "errorFile": {
//             "type": "file",
//             "filename": "logs/errors.log"
//         },
//         "errors": {
//             "type": "logLevelFilter",
//             "level": "ERROR",
//             "appender": "errorFile"
//         }
//     },
//     "categories": {
//         "default": { "appenders": ["app", "errors"], "level": "DEBUG" },
//         "http": { "appenders": ["access"], "level": "DEBUG" }
//     }
// });

