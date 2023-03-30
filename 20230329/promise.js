/**
 * 1. 异步回调
 *
 * 1.1 回调地狱
 * 在需要多个操作的时候，会导致多个回调函数嵌套，导致代码不够直观，就是常说的回调地狱
 *
 * 1.2 并行结果
 * 如果几个异步操作之间并没有前后顺序之分，但需要等多个异步操作都完成后才能执行后续的任务，无法实现并行节约时间
 */

/**
 * 2. Promise
 * Promise本意是承诺，在程序中的意思就是承诺我过段时间后会给你一个结果。什么时候会用到过一段时间？答案是异步操作，
 * 异步是指可能比较长时间才有结果的才做，例如网络请求、读取本地文件等
 */

/**
 * 3. Promise的三种状态
 * - Pending Promise 对象实例创建时候的初始状态
 * - Fulfilled 可以理解为成功的状态
 * - Rejected 可以理解为失败的状态
 *
 * then 方法就是用来指定 Promise 对象的状态改变时确定执行的操作，resolve 时执行第一个函数（onFulfilled）, reject 时执行第二个函数（onRejected）
 */

/**
 * 4. 构造一个Promise
 *
 * 4.1 使用Promise
 * const promise = new Promise((resolve, reject) => {
 *      setTimeout(() => {
 *          if(Math.random()>0.5)
 *              resolve('This is resolve!');
 *          else
 *              reject('This is reject!');
 *      }, 1000);
 * });
 * promise.then(Fulfilled, Rejected);
 *
 * - 构造一个Promise实例需要给Promise构造函数传入一个函数。
 * - 传入的函数需要有两个形参，两个形参都是function类型的参数。
 *      - 第一个形参运行后会让 Promise 实例处于 resolve 状态， 所以我们一般给第一个形参命名为 resolve, 使 Promise 对象的状态改变成成功，
 *        同时传递一个参数用于后续成功后的操作
 *      - 第二个形参运行后会让 Promise 实例处于 reject 状态，所以我们一般给第二个形参命名为 reject, 将 Promise 对象的状态改变为失败，同时
 *        将错误的信息传递到后续错误处理的操作
 *
 * 4.2 es5模拟Promise
 *
 * function Promise(fn) {
 *      fn((data) => {
 *          this.success(data);
 *      }, (error) => {
 *          this.error();
 *      });
 * }
 * Promise.prototype.resolve = function(data) {
 *      this.success(data);
 * }
 * Promise.prototype.reject = function(error) {
 *      this.error(error);
 * }
 *
 * Promise.prototype.then = function(success, error) {
 *      this.success = success;
 *      this.error = error;
 * }
 *
 * 4.3 es6模拟Promise
 *
 * class Promise {
 *      constructor(fn) {
 *          fn((data) => {
 *              this.success(data);
 *          }, (error) => {
 *              this.error();
 *          });
 *      }
 *
 *      resolve(data) {
 *          this.success(data);
 *      }
 *
 *      reject(error) {
 *          this.error(error);
 *      }
 *
 *      then(success, error) {
 *          this.success = success;
 *          this.error = error;
 *          console.log(this);
 *      }
 * }
 */

/**
 * 5. promise 做为函数的返回值
 *
 * function ajaxPromise(queryUrl) {
 *      return new Promise((resolve, reject) => {
 *          const xhr = new XMLHttpRequest();
 *          xhr.open('GET', queryUrl, true);
 *          xhr.send(null);
 *          xhr.onreadystatechange = () => {
 *              if(xhr.readyState === 4) {
 *                  if(xhr.status === 200) {
 *                      resolve(xhr.responseText);
 *                  } else {
 *                      reject(xhr.responseText);
 *                  }
 *              }
 *          }
 *      });
 * }
 *
 * ajaxPromise('http://www.baidu.com')
 *  .then((value) => {
 *      console.log(value);
 *  })
 *  .catch((err) => {
 *      console.error(error);
 *  });
 */

/**
 * 6. promise 的链式调用
 * - 每次调用返回的都是一个新的 Promise 实例
 * - 链式调用的参数通过返回值传递
 *
 * then 可以使用链式调用的写法原因在于，每一次执行该方法时总是会返回一个 Promise 对象
 *
 * readFile('1.txt').then(function(data) {
 *      console.log(data);
 *      return data;
 * }).then(function(data) {
 *      console.log(data);
 *      return readFile(data);
 * }).then(function(data) {
 *      console.log(data);
 * }).catch(function(err){
 *      console.log(err);
 * });
 */

/**
 * 7. promise API
 * 7.1 Promise.all
 * - 参数：接受一个数组，数组内部都是 Promise 实例
 * - 返回值：返回一个 Promise 实例，这个 Promise 实例的状态转移取决于参数的 Promise 实例的状态变化。当参数中所有的实例都处于 resolve 状态时，
 * 返回的 Promise 实例会变为 resolve 状态。如果参数中任意一个实例处于 reject 状态，返回的 Promise 实例变为 reject 状态。
 *
 * Promise.all([p1, p2]).then(function(result) {
 *      console.log(result); // ['2.txt', '2']
 * });
 *
 * 不管两个promise谁先完成，Promise.all 方法会按照数组里面的顺序将结果返回
 *
 * 7.2 Promise.race
 * - 参数：接受一个数组，数组内部是 Promise 实例
 * - 返回值：返回一个 Promise 实例，这个 Promise 实例的状态转移取决于参数的 Promise 实例的状态变化。当参数中任何一个实例处于 resolve 状态时，返回的
 * Promise 实例会变为 resolve 状态。如果参数中任意一个实例处于 reject 状态，返回的 Promise 实例变为 reject 状态。
 *
 * Promise.race([p1,p2]).then(function(result){
 *      console.log(result); // ['2.txt', '2']
 * });
 *
 * 7.3 Promise.resolve
 * 返回一个 Promise 实例，这个实例处于 resolve 状态。
 *
 * 根据传入的参数不同有不同的功能：
 * - 值（对象、数组、字符串等）：作为 resolve 传递出去的值
 * - Promise 实例：原封不动返回
 *
 * 7.4 Promise.reject
 * 返回一个 Promise 实例，这个实例处于 reject 状态。
 * - 参数一般就是抛出的错误信息。
 */

/**
 * 8. q
 * Q是一个在JavaScript中实现promise的模块
 *
 * 8.1 q的基本用法
 *
 * const Q = require('q');
 * const fs = require('fs');
 * function read(filename) {
 *      const deferred = Q.defer();
 *      fs.readFile(filename, 'utf8', function(err, data) {
 *          if(err) {
 *              deferred.reject(err);
 *           } else {
 *              deferred.resolve(data);
 *           }
 *      });
 *      return deferred.promise;
 * }
 *
 * read('1.txt1').then(function(data) {
 *      console.log(data);
 * }, function(error) {
 *      console.log(error);
 * });
 *
 * 8.2 q的简单实现
 *
 * module.exports = {
 *      defer() {
 *          var _success, _error;
 *          return {
 *              resolve(data) {
 *                  _success(data);
 *              },
 *              reject(err) {
 *                  _error(err);
 *              },
 *              promise: {
 *                  then(success, error) {
 *                      _success = success;
 *                      _error = error;
 *                  }
 *              }
 *          }
 *      }
 * }
 *
 * 8.3 q的实现
 *
 * var defer = function () {
 *      var pending = [], value;
 *      return {
 *          resolve: function(_value) {
 *              if(pending) {
 *                  value = _value;
 *                  for(var i = 0, ii = pending.length; i < ii; i++) {
 *                      var callback = pending[i];
 *                      callback(value);
 *                  }
 *                  pending = undefined;
 *              }
 *          },
 *          promise: {
 *              then: function(callback) {
 *                  if(pending) {
 *                      pending.push(callback);
 *                  } else {
 *                      callback(value);
 *                  }
 *              }
 *          }
 *      };
 * };
 */

/**
 * 9. bluebird
 *
 * 实现 promise 标准的库是功能最全，速度最快的一个库
 *
 * 9.1 bluebird经典使用
 *
 * const Promise = require('./bluebird');
 *
 * const readFile = Promise.promisify(require("fs").readFile);
 * readFile("1.txt", "utf8").then(function(contents){
 *      console.log(contents);
 * });
 *
 * const fs = Promise.promisifyAll(require("fs"));
 * fs.readFileAsync("1.txt", "utf8").then(function(contents){
 *      console.log(contents);
 * });
 *
 * 9.2 bluebird简单实现
 *
 * module.exports = {
 *      promisify(fn){
 *          return function() {
 *              const args = Array.from(arguments);
 *              return new Promise(function(resolve, reject){
 *                  fn.apply(null, args.concat(function(err){
 *                      if(err) reject(err);
 *                      else resolve(arguments[1]);
 *                  }));
 *              })
 *          }
 *      },
 *      promisifyAll(obj) {
 *          for(var attr in obj) {
 *              if(obj.hasOwnProperty(attr) && typeof obj[attr] == 'function') {
 *                  obj[attr+'Async'] = this.promisify(obj[attr]);
 *              }
 *          }
 *          return obj;
 *      }
 * }
 */

/**
 * 10. 动画
 *
 * animate.html
 */

/**
 * 11. co
 *
 * 11.1 co初体验
 *
 * const fs = require('fs');
 * function getNumber() {
 *      return new Promise(function(resolve, reject) {
 *          setTimeout(function(){
 *              let number = Math.random();
 *              if(number > .5) {
 *                  resolve(number);
 *              } else {
 *                  reject('数字太小');
 *              }
 *          }, 1000);
 *      });
 * }
 *
 * function *read() {
 *      let a = yield getNumber();
 *      console.log(a);
 *      let b = yield 'b';
 *      console.log(b);
 *      let c = yield getNumber();
 *      console.log(c);
 * }
 *
 * function co(gen) {
 *      return new Promise(function(resolve, reject) {
 *          let g = gen();
 *          function next(lastValue) {
 *              const { done, value } = g.next(lastValue);
 *              if(done) {
 *                  resolve(lastValue);
 *              } else {
 *                  if(value instanceof Promise) {
 *                      value.then(next, function(val){
 *                          reject(val);
 *                      });
 *                  } else {
 *                      next(value);
 *                  }
 *              }
 *          }
 *          next();
 *      });
 * }
 *
 * co(read).then(function(data){
 *      console.log(data);
 * }, function(reason){
 *      console.log(reason);
 * });
 *
 * 11.2 co 连续读文件
 *
 * const fs = require('fs');
 *
 * function readFile(filename){
 *      return new Promise(function(resolve,reject){
 *          fs.readFile(filename, 'utf8', function(err, data){
 *              if(err)
 *                  reject(err);
 *              else
 *                  resolve(data);
 *          })
 *      });
 * }
 *
 * function *read() {
 *      let a = yield readFile('./1.txt');
 *      console.log(a);
 *      let b = yield readFile('./2.txt');
 *      console.log(b);
 * }
 *
 * function co(gen) {
 *      const g = gen();
 *      function next(val) {
 *          const { done, value } = g.next(val);
 *          if(!done) {
 *              value.then(next);
 *          }
 *      }
 *      next();
 * }
 *
 * co(read).then((data) => {
 *      console.log(data);
 * })
 */

/**
 * 12. Promise/A+ 完整实现
 *
 * promiseA+.js
 */

/**
 * 13. 资源
 * - bluebirdAPI (http://bluebirdjs.com/docs/api-reference.html)
 * - JavaScript Promise迷你书（中文版） （http://liubin.github.io/promises-book/）
 * - Promise/A+规范 (http://segmentfault.com/a/1190000002452115)
 * - Promise/A+ (https://promisesaplus.com/)
 */

/**
 * 14. 作业
 * 1. 自己实现promise的all、race、resolve和reject方法
 */
