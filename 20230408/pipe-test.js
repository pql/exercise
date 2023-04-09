const stream = require("stream");

var index = 0;
const readable = stream.Readable({
    highWaterMark: 2,
    read: function () {
        process.nextTick(() => {
            console.log("push", ++index);
            this.push(index + "");
        });
    },
});

const writable = stream.Writable({
    highWaterMark: 2,
    write: function (chunk, encoding, next) {
        console.log("写入：", chunk.toString());
    },
});

readable.pipe(writable);
