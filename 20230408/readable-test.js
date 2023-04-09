const stream = require('stream');
const util = require('util');
util.inherits(Counter, stream.Readable);

function Counter(options) {
    stream.Readable.call(this, options);
    this._index = 0;
}

Counter.prototype._read = function () {
    if (this._index++ < 3) {
        this.push(this._index + '');
    } else {
        this.push(null);
    }
};

const counter = new Counter();

counter.on('data', function (data) {
    console.log('读到数据：' + data.toString()); // no maybe
});

counter.on('end', function (data) {
    console.log('读完了');
});