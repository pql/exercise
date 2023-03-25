/**
 * co 是一个为Node.js 和浏览器打造的基于生成器的流程控制工具，借助于Promise,你可以更加优雅的方式编写非阻塞代码
 */

const fs = require('fs');

function co(generator) {
    const it = generator();
    return new Promise(function (resolve, reject) {
        !function next(lastVal) {
            const { value, done } = it.next(lastVal);
            if (done) {
                resolve(value);
            } else {
                value.then(next, reason => reject(reaseon));
            }
        }();
    });
}

function readFile(fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function* read() {
    const template = yield readFile('./template.txt');
    const data = yield readFile('./data.txt');
    return template + '+' + data;
}

co(read).then(function (data) {
    console.log(data);
}, function (err) {
    console.log(err);
})