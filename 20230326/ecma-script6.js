/**
 * ECMAScript 简称就是ES,你可以把它看成是一套标准，JavaScript 就是实施了这套标准的一门语言，现在主流浏览器使用的是ECMAScript5。
 * https://babeljs.io/repl
 */

/**
 * 1. 作用域变量
 * 作用域就是一个变量的作用范围。也就是你声明一个变量后，这个变量可以在什么场合下使用。以前的JavaScript 只有一个全局作用域，还有一个函数作用域。
 */

/**
 * 1.1 var 的问题
 * 1. var 没有块级作用域，定义后在当前闭包中都可以访问，如果变量名重复，就会覆盖前面定义的变量，并且也有可能被其他人更改。
 * if(true) {
 *      var a = "a"; // 期望a是某一个值
 * }
 * console.log(a);
 * 
 * 2. var 在for循环标记变量共享，一般在循环中使用的i会被共享，其本质上也是由于没有块级作用域造成的
 * for(var i=0; i<3; i++) {
 *      setTimeout(function(){
 *          alert(i);
 *      }, 0);
 * }
 * 
 * 结果是弹窗三次  3
 */

/**
 * 1.2 块级作用域
 * 在用 var 定义变量的时候，变量是通过闭包进行隔离的，现在用了 let, 不仅可以通过闭包隔离，还增加了一些块级作用域隔离。
 * 块级作用用一组大括号定义一个块，使用 let 定义的变量在大括号的外面是访问不到的
 * 
 * 1.2.1 实现块级作用域
 * 
 * if(true) {
 *      let name = 'zfpx';
 * }
 * console.log(name); // ReferenceError: name is not defined
 * 
 * 1.2.2 不会污染全局对象
 * if(true) {
 *      let name = 'zfpx';
 * }
 * console.log(window.name);
 * 
 * 结果 undefined
 * 
 * 1.2.3 for 循环中也可以使用 i
 * // 嵌套循环不会相互影响
 * for(let i = 0; i < 3; i++) {
 *      console.log("out", i);
 *      for(let i = 0; i < 2; i++) {
 *          console.log("in", i);
 *      }
 * }
 * 
 * 结果 out 0 in 0 in 1 out 1 in 0 in 1 out 2 in 0 in 1
 * 
 * 1.2.4 重复定义会报错
 * if(true) {
 *      let a = 1;
 *      let a = 2; // Identifier 'a' has already been declared
 * }
 * 
 * 1.2.5 不存在变量的预解释
 * for(let i = 0; i < 2; i++) {
 *      console.log('inner', i);
 *      let i = 100;
 * }
 * 
 * 结果 i is not defined
 * 
 * 1.2.6 闭包的新写法
 * 以前
 * ;(function(){
 * })();
 * 
 * 现在
 * {
 * }
 */

/**
 * 2.常量
 * 使用 const 我们可以去声明一个常量，常量一旦赋值就不能再修改了
 * 
 * 2.1 常量不能重新赋值
 * const MY_NAME = 'zfpx';
 * MY_NAME = 'zfpx2'; // Assignment to constant variable
 * 
 * 2.2 变量值可改变
 * 注意 const 限制的是不能给变量重新赋值，而变量的值本身是可以改变的，下面的操作是可以的
 * const names = ['zfpx1'];
 * names.push('zfpx2');
 * console.log(names);
 * 
 * 2.3 不同的块级作用域可以多次定义
 * const A = "0";
 * {
 *      const A = "A";
 *      console.log(A);
 * }
 * {
 *      const A = "B";
 *      console.log(A);
 * }
 * console.log(A);
 */

/**
 * 3. 解构
 * 
 * 3.1 解析数组
 * 解构意思就是分解一个东西的结构，可以用一种类似数组的方式定义N个变量，可以将一个数组中的值按照规则赋值过去。
 * 
 * var [name, age] = ['zfpx', 8];
 * console.log(name, age);
 * 
 * 3.2 嵌套赋值
 * let [x, [y], z] = [1, [2.1, 2.2]];
 * console.log(x, y, z); // 1 2.1 undefined
 * let [x, [y, z]] = [1, [2.1, 2.2]];
 * console.log(x, y, z); // 1 2.1 2.2
 * let [json, arr, num] = [{name: 'zfpx'}, [1,2],3];
 * console.log(json, arr, num); // {name: 'zfpx'} [1,2] 3
 * 
 * 3.3 省略赋值
 * let [, , x] = [1,2,3];
 * console.log(x); // 3
 * 
 * 3.4 解构对象
 * 对象也可以被解构
 * const obj = { name: 'zfpx', age: 8 };
 * // 对象里的name属性的值会交给name这个变量，age的值会交给age这个变量
 * const { name, age } = obj;
 * 
 * // 对象里的name属性的值会交给myname这个变量，age的值会交给myage这个变量
 * const { name: myname, age: myage } = obj;
 * console.log(name, age, myname, myage); // 'zfpx' 8 'zfpx' 8
 * 
 * 3.5 默认值
 * 在赋值和传参的时候可以使用默认值
 * 
 * let [a = "a", b = "b", c = new Error('C必须指定')] = [1, , 3];
 * console.log(a, b, c); // 1 'b' 3
 * 
 * function ajax(options) {
 *      var method = options.method || 'get';
 *      var data = options.data || {};
 *      // ...
 * }
 * 
 * function ajax({method = "get", data}) {
 *      console.log(arguments);
 * }
 * ajax({
 *      method: "post",
 *      data: {"name": "zfpx"}
 * })
 */

/**
 * 4.字符串
 * 
 * 4.1 模版字符串
 * 模板字符串用反引号（数字1左边的那个键）包含，其中的变量用 ${} 括起来
 * var name = 'zfpx', age = 8;
 * let desc = `${name} is ${age} old!`;
 * console.log(desc);
 * 
 * // 所有模板字符串的空格和换行，都是被保留的
 * var str = `
 *      <ul>
 *          <li>a</li>
 *          <li>b</li>
 *      </ul>
 * `;
 * console.log(str);
 * 
 * 其中的变量会用变量的值替换掉
 * function replace(desc) {
 *      return desc.replace(/\$\{([^}]+)\}/g, function(matched, key){
 *          return eval(key);
 *      });
 * }
 * 
 * 4.2 带标签的模板字符串
 * 可以在模板字符串的前面添加一个标签，这个标签可以去处理模板字符串，标签其实就是一个函数，
 * 函数可以接收两个参数，一个是 strings ，就是模板字符串里的每个部分的字符 还有一个参数
 * 可以使用 rest 的形式 values ，这个参数里面是模板字符串里的值
 * 
 * var name = 'zfpx', age = 8;
 * function desc(strings, ...values) {
 *      console.log(strings, values);
 * }
 * desc`${name} is ${age} old!`;
 */

/**
 * 4.3 字符串新方法
 * - includes() 返回布尔值，表示是否找到了参数字符串
 * - startsWith() 返回布尔值，表示参数字符串是否在源字符串的头部
 * - endsWith() 返回布尔值，表示参数字符串是否在源字符串的尾部
 * 
 * var s = 'zfpx';
 * s.startsWith('z'); // true
 * s.endsWith('x'); // true
 * s.includes('p'); // true
 * 
 * 第二个参数，表示开始搜索的位置
 * 
 * var s = 'zfpx';
 * console.log(s.startsWith('p', 2)); // true
 * console.log(s.endsWith('f', 2)); // true
 * console.log(s.includes('f', 2)); // false
 * 
 * endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束
 */

/**
 * 4.4 repeat
 * repeat 方法返回一个新字符串，表示将原字符串重复n次。
 * 
 * 'x'.repeat(3);
 * 'x'.repeat(0);
 */

/**
 * 5. 函数
 * 5.1 默认参数
 * 可以给定义的函数接收的参数设置默认的值，在执行这个函数的时候，如果不指定函数的参数的值，就会使用参数的这些默认的值
 * 
 * function ajax(url, method='GET', dataType='json') {
 *      console.log(url);
 *      console.log(method);
 *      console.log(dataType);
 * }
 * 
 * 5.2 展开操作符
 * 把...放在数组前面可以把一个数组进行展开，可以把一个数组直接传入一个函数而不需要使用 apply
 * 
 * // 传入参数
 * const print = function(a,b,c){
 *      console.log(a,b,c);
 * }
 * print([1,2,3]);
 * print(...[1,2,3]);
 * 
 * // 可以替代apply
 * var m1 = Math.max.apply(null, [8,9,4,1]);
 * var m2 = Math.max(...[8,9,4,1]);
 * 
 * // 可以替代concat
 * var arr1 = [1,3];
 * var arr2 = [3,5];
 * var arr3 = arr1.concat(arr2);
 * var arr4 = [...arr1, ...arr2];
 * console.log(arr3, arr4);
 * 
 * // 类数组的转数组
 * function max(a,b,c){
 *      console.log(Math.max(...arguments));
 * }
 * max(1,3,4);
 * 
 * 5.3 剩余操作符
 * 剩余操作符可以把其余的参数的值都放到一个叫 b 的数组里面
 * 
 * const rest = function(a, ...rest) {
 *      console.log(a, rest);
 * }
 * rest(1,2,3);
 */

/**
 * 5.4 解构参数
 */