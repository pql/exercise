const EventEmitter = require("./events");
const util = require("util");

util.inherits(Bell, EventEmitter);
function Bell() {
  EventEmitter.call(this);
}
const bell = new Bell();
bell.on("newListener", function (type, listener) {
  console.log(`对 ${type} 事件增加 ${listener}`);
});
bell.on("removeListener", function (type, listener) {
  console.log(`对${type}事件删除${listener}`);
});
function teacherIn(thing) {
  console.log(`老师带${thing}进教室`);
}
function studentIn(thing) {
  console.log(`学生带${thing}进教室`);
}
function masterIn(thing) {
  console.log(`校长带${thing}进教室`);
}
bell.on("响", teacherIn);
bell.on("响", studentIn);
bell.on("响", masterIn);
bell.emit("响", "书");
console.log("==================");
bell.emit("响", "书");
console.log("==================");
bell.removeAllListeners("响");
console.log("===================");
bell.emit("响", "书");

