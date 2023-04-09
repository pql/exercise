const { Transform } = require("stream");
const fs = require("fs");
const rs = fs.createReadStream("./users.json");
rs.setEncoding("utf8");
const toJson = Transform({
    readableObjectMode: true,
    transform(chunk, encoding, callback) {
        this.push(JSON.parse(chunk));
        callback();
    },
});

const jsonOut = Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
        console.log(chunk);
        callback();
    },
});

rs.pipe(toJson).pipe(jsonOut);