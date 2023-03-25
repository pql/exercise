/**
 * ES6 模块化是 ECMA 提出的 JavaScript 模块化规范，它在语言的层面上实现了模块化。
 * 浏览器厂商和 Node.js 都宣布要原生支持该规范。它将逐渐取代 CommonJS 和 AMD 规范，
 * 成为浏览器和服务器通用的模块解决方案。采用 ES6 模块化导入及导出的代码如下
 */

// 导入
import { name } from './person.js';
// 导出
export const name = 'zfpx';

// ES6模块虽然是终极模块化方案，但它的缺点在于目前无法直接运行在大部分 JavaScript 运行环境下，必须通过工具转换成标准的 ES5 后才能正常运行。
