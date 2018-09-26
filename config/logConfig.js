var midlog = require('midlog');
const path = require("path");
// 配置日志中间件
var firstValve = midlog({
    env: 'online',
    exportGlobalLogger: true,
    appender: [{
        type: 'INFO',
        logdir: path.join(__dirname,'../logs'),
        pattern: '%d %r %x{name}:%z %p - %m%n',
        rollingFile: false,
        duation: 60000,
        name: 'info.log',
        nameformat: '[info.]HH-mm-ss[.log]',
        tokens: {
            name: 'helloworld'
        },
        cacheSize: 5 * 1024 * 1024,
        flushTimeout: 15000
    }, {
        type: 'ERROR',
        logdir: path.join(__dirname,'../logs'),
        pattern: '%d %r %x{name}:%z %p - %m%n',
        rollingFile: false,
        duation: 60000,
        name: 'error.log',
        nameformat: '[info.]HH-mm-ss[.log]',
        tokens: {
            name: 'helloworld'
        },
        cacheSize: 10240,
        flushTimeout: 10000
    }, {
        type: 'TRACE',
        logdir: path.join(__dirname,'../logs'),
        pattern: '%d %r %x{name}:%z %p - %m%n',
        rollingFile: false,
        duation: 60000,
        name: 'trace.log',
        nameformat: '[info.]HH-mm-ss[.log]',
        tokens: {
            name: 'helloworld'
        },
        cacheSize: 5 * 1024 * 1024,
        flushTimeout: 10000
    }]
});

module.exports = firstValve;