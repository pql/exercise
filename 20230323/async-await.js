/**
 * 使用 async 关键字，你可以轻松地达成之前使用生成器和co函数所做到的工作
 * Async的优点
 * - 内置执行器
 * - 更好的语义
 * - 更好的适用性
 */
const fs = require('fs');

function readFile(fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

async function read() {
    const template = await readFile('./template.txt');
    const data = await readFile('./data.txt');
    return template + '+' + data;
}
const result = read();
result.then(data => console.log(data));

/**
 * async 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里。
 */
async function read() {
    const template = await readFile('./template.txt');
    const data = await readFile('./data.txt');
    return template + '+' + data;
}
// 等同于
function read() {
    return co(function* () {
        const template = yield readFile('./template.txt');
        const data = yield readFile('./data.txt');
        return template + '+' + data;
    });
}