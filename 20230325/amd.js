/**
 * AMD 也是一种 JavaScript 模块化规范，与 CommonJS 最大的不同在于它采用异步的方式
 * 去加载依赖的模块。AMD规范主要是为了解决针对浏览器环境的模块化问题，最具代表性的实现
 * 是 requirejs。
 * 
 * AMD 的优点
 * - 可在不转换代码的情况下直接在浏览器中运行
 * - 可加载多个依赖
 * - 代码可运行在浏览器环境和Node.js环境下
 * 
 * AMD 的缺点
 * - JavaScript 运行环境没有原生支持 AMD, 需要先导入实现了 AMD 的库后才能正常使用。
 */

// 1.3.1 用法
//```
// 定义一个模块
define('a', [], function () {
    return 'a';
});
define('b', ['a'], function (a) {
    return a + 'b';
});
// 导入和使用
require(['b'], function (b) {
    console.log(b);
});
//```

// 1.3.2 原理
// ```
let factories = {};
function define(modName, dependencies, factory) {
    factory.dependencies = dependencies;
    factories[modName] = factory;
}
function require(modNames, callback) {
    const loadedModNames = modNames.map(function (modName) {
        const factory = factories[modName];
        const dependencies = factory.dependencies;
        let exports;
        require(dependencies, function (...dependencyMods) {
            exports = factory.apply(null, dependencyMods);
        });
        return exports;
    });
    callback.apply(null, loadedModNames);
}

define('a', [], function () {
    return 'a';
});
define('b', ['a'], function (a) {
    return a + 'b';
});
// 导入和使用
require(['b'], function (b) {
    console.log(b);
});
// ```