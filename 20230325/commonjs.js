/**
 * CommonJS是一种使用广泛的 JavaScript 模块化规范，核心思想是通过 require 方法来同步地加载依赖的其他模块，通过module.exports导出需要暴露的接口。
 */

// 1.2.1 用法
// 采用 CommonJS 导入及导出时的代码如下：

// ```
// 导入
const someFun = require('./moduleA');
someFunc();

// 导出
module.exports = someFum;
// ```

// 1.2.2 原理
// a.js

// ```
const fs = require('fs');
const path = require('path');

function req(mod) {
    const filename = path.join(__dirname, mod);
    const content = fs.readFileSync(filename, 'utf8');
    const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', content + '\n return module.exports;');
    const module = {
        exports: {}
    }
    return fn(module.exports, req, module, __filename, __dirname);
}
// ```

// b.js
//```
console.log('bbb');
exports.name = 'zfpx';
//```