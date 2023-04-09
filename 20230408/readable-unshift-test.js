const { Transform } = require("stream");
const { StringDecoder } = require("string_decoder");
const decoder = new StringDecoder("utf8");
const fs = require("fs");
const rs = fs.createReadStream("./req.txt");

function parseHeader(stream, callback) {
    let header = "";
    rs.on("readable", onReadable);

    function onReadable() {
        let chunk;
        while (null != (chunk = rs.read())) {
            const str = decoder.write(chunk);
            // console.log(str);
            if (str.match(/\r\n\r\n/)) {
                const split = str.split(/\r\n\r\n/);
                // console.log(split);
                header += split.shift();
                const remaining = split.join("\r\n\r\n");
                const buf = Buffer.from(remaining, "utf8");
                rs.removeListener("readable", onReadable);
                if (buf.length) {
                    stream.unshift(buf);
                }
                callback(null, header, rs);
            } else {
                header += str;
            }
        }
    }
}
parseHeader(rs, function (err, header, stream) {
    console.log(header);
    stream.setEncoding("utf8");
    stream.on("data", function (data) {
        console.log("data", data);
    });
});
