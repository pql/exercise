## 1. 控制台

在 Node.js 中，使用`console`对象代表控制台（在操作系统中表现为一个操作系统指定的字符界面，比如 Window 中命令提示窗口）。

- console.log
- console.info
- console.error 重定向到文件
- console.warn
- console.dir
- console.time
- console.timeEnd
- console.trace
- console.assert

## 2. 全局作用域

- 全局作用域（global）可以定义一些不需要通过任何模块的加载即可使用的变量、函数或类
- 定义全局变量时变量会成为 global 的属性
- 永远不要使用 `var` 关键字定义变量，以免污染全局作用域
- setTimeout clearTimeout
- setInterval clearInterval
- unref 和 ref

```js
const test = function () {
  console.log("callback");
};
const timer = setInterval(test, 1000);
timer.unref();
setTimeout(function () {
  timer.ref();
}, 3000);
```

## 3.函数

- require
- 模块加载过程
- require.resolve
- 模版缓存(require.cache)
- require.main
- 模块导出

```
module.exports, require, module, filename, dirname
```

## 4.process

### 4.1 process 对象

在 node.js 里，process 对象代表 node.js 应用程序，可以获取应用程序的用户，运行环境等各种信息。

```js
process.argv.forEach(function (item) {
  console.log(item);
});
process.on("exit", function () {
  console.log("clear");
});

process.on("uncaughtException", function (err) {
  console.log(err);
});

console.log(process.memoryUsage());
console.log(process.cwd());
console.log(__dirname);
process.chdir("..");
console.log(process.cwd());
console.log(__dirname);

function err() {
  throw new Error("报错了");
}
err();
```

### 4.2 process.nextTick & setImmediate

- process.nextTick() 方法将 callback 添加到 "next tick"队列。一旦当前事件轮询队列的任务全部完成，在 next tick 队列中的所以 callbacks 会被依次调用。
- setImmediate 预定立即执行的 callback, 它是在 I/O 事件的回调之后被触发

```js
setImmediate(function () {
  console.log("4");
});
setImmediate(function () {
  console.log("5");
});
process.nextTick(function () {
  console.log("1");
  process.nextTick(function () {
    console.log("2");
    process.nextTick(function () {
      console.log("3");
    });
  });
});

console.log("next");
```

## 5. EventEmitter

在 Node.js 的用于实现各种事件处理的 event 模块中，定义了 EventEmitter 类，所以可能触发事件的对象是一个继承自 EventEmitter 类的子类实例对象。

| 方法名和参数                    | 描述                                                                       |
| ------------------------------- | -------------------------------------------------------------------------- |
| addListener(event, listener)    | 对指定事件绑定事件处理函数                                                 |
| on(event, listener)             | 对指定事件绑定事件处理函数                                                 |
| once(event, listener)           | 对指定事件指定只执行一次的事件处理函数                                     |
| removeListener(event, listener) | 对指定事件解除事件处理函数                                                 |
| removeAllListener([event])      | 对指定事件解除所有的事件处理函数                                           |
| setMaxListeners(n)              | 指定事件处理函数的最大数量，n 为整数值，代表最大的可指定事件处理函数的数量 |
| listeners(event)                | 获取指定事件的所有事件处理函数                                             |
| emit(event,[arg1],[arg2],[...]) | 手工触发指定事件                                                           |

## 自定义事件

继承自 EventEmitter 的案例(Bell)

./bell.js

## util

```js
var util = require("util");
// util.inherit();
console.log(util.inspect({ name: "zfpx" }));
console.log(util.isArray([]));
console.log(util.isRegExp(/\d/));
console.log(util.isDate(new Date()));
console.log(util.isError(new Error()));
```

## 6.node 断点调试

V8 提供了一个强大的调试器，可以通过 TCP 协议从外部访问。Nodejs 提供了一个内建调试器来帮助开发者调试应用程序。想要开启调试器我们需要在代码中加入 debugger 标签，当 Nodejs 执行到 debugger 标签时会自动暂停（debugger 标签相当于在代码中开启一个断点）。

```js
var a = "a";
var b = "b";

debugger;

var all = a + " " + b;
console.log(all);
```

| 命令                     | 用途                                 |
| ------------------------ | ------------------------------------ |
| c                        | 继续执行到下一个断点处               |
| next,n                   | 单步执行                             |
| step,s                   | 单步进入函数                         |
| out,o                    | 退出当前函数                         |
| setBreakpoint(10),sb(10) | 在第 10 行设置断点                   |
| repl                     | 打开求值环境，ctrl_c 退回 debug 模式 |
| watch(exp)               | 把表达式添加监视列表                 |
| watchers                 | 显示所有表达式的值                   |

[debugger](https://nodejs.org/api/debugger.html)
