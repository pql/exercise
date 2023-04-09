const { Duplex } = require("stream");
const inoutStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    },
    read(size) {
        this.push(++this.index + "");
        if (this.index > 3) {
            this.push(null);
        }
    },
});

inoutStream.index = 0;
process.stdin.pipe(inoutStream).pipe(process.stdout);
