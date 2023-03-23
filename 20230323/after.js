// 用于需要调用多次才执行的函数
const after = function (times, task) {
  return function () {
    if (times-- == 1) {
      return task.apply(this, arguments);
    }
  };
};

const fn = after(3, function () {
  console.log(3);
});

fn();
fn();
fn();
