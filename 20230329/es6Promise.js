class Promise {
  constructor(executor) {
    executor(
      (value) => {
        this.onfulfilled(value);
      },
      (reason) => {
        this.onrejected();
      }
    );
  }

  resolve(data) {
    this.onfulfilled(data);
  }

  reject(error) {
    this.onrejected(error);
  }

  then(onfulfilled, onrejected) {
    this.onfulfilled = onfulfilled;
    this.onrejected = onrejected;
    console.log(this);
  }
}

const p = new Promise((resolve, reject) => {
  const random = Math.random() * 10;
  setTimeout(() => {
    if (random > 5) {
      resolve(random);
    } else {
      reject();
    }
  }, 1000);
});

p.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);
