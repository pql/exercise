/**
 * 异步多级依赖的情况下嵌套非常深，代码难以阅读和维护
 */

const fs = require('fs');
fs.readFile('template.txt', 'utf8', function (err, template) {
    fs.readFile('data.txt', 'utf8', function (err, data) {
        console.log(template + ' ' + data)
    })
})