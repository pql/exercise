/**
 * 所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数
 */

const fs = require('fs');

fs.readFile('./data.txt', function (err, data) {
    if (err) throw err;
    console.log(data);
});

// 异步代码 try catch 不再生效
let async = function (callback) {
    try {
        // 因为这个回调函数被存放了起来，直到下一个事件环的时候才会取出，try只能捕获当前循环内的异常，对callback异步无能为力。
        setTimeout(function () {
            callback();
        }, 1000)
    } catch (e) {
        console.log('捕获错误', e);
    }
}
async(function () {
    console.log(t)
});

// Node在处理异常有一个约定，将异常作为回调的第一个实参传回，如果为空表示没有出错
async(function (err, callback) {
    if (err) {
        console.log(err);
    }
});

/**
 * 异步方法也要遵循两个原则
 * 1.必须在异步之后调用传入的回调函数
 * 2.如果出错了要向回调函数传入异常供调用者判断
 */
const async1 = function (callback) {
    try {
        setTimeout(function () {
            if (success) {
                callback();
            } else {
                callback('错误');
            }
        }, 1000)
    } catch (e) {
        console.log('捕获错误', e);
    }
}