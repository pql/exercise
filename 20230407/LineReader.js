const fs = require("fs");
const EventEmitter = require("events");
const util = require("util");

util.inherits(LineReader, EventEmitter);
fs.readFile("./1.txt", function (data) {
    console.log(data);
});

function LineReader(path) {
    EventEmitter.call(this);
    this._rs = fs.createReadStream(path);
    this.RETURN = 0x0d; // \r 13
    this.NEW_LINE = 0x0a; // \n 10

    this.on("newListener", function (type, listener) {
        if (type === "newLine") {
            const buffer = [];
            this._rs.on("readable", () => {
                let bytes;
                while (null != (bytes = this._rs.read(1))) {
                    const ch = bytes[0];
                    switch (ch) {
                        case this.RETURN:
                            this.emit("newLine", Buffer.from(buffer));
                            buffer.length = 0;
                            const nByte = this._rs.read(1);
                            if (nByte && nByte[0] != this.NEW_LINE) {
                                buffer.push(nByte[0]);
                            }
                            break;
                        case this.NEW_LINE:
                            this.emit("newLine", Buffer.from(buffer));
                            buffer.length = 0;
                            break;
                        default:
                            buffer.push(bytes[0]);
                            break;
                    }
                }
            });
            this._rs.on("end", () => {
                if (buffer.length > 0) {
                    this.emit("newLine", Buffer.from(buffer));
                    buffer.length = 0;
                    this.emit("end");
                }
            });
        }
    });
}

const lineReader = new LineReader("./1.txt");
lineReader
    .on("newLine", function (data) {
        console.log(data.toString());
    })
    .on("end", function () {
        console.log("end");
    });
