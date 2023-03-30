function Promise(fn) {
  fn(
    (data) => {
      this.success(data);
    },
    (error) => {
      this.error();
    }
  );
}

Promise.prototype.resolve = function (data) {
  this.success(data);
};

Promise.prototype.reject = function (error) {
  this.error(error);
};

Promise.prototype.then = function (success, error) {
  this.success = success;
  this.error = error;
};
