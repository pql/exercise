const net = require("net");
const path = require("path");

const ws = require("fs").createWriteStream(path.resolve(__dirname, "msg.txt"));

const server = net.createServer(function (socket) {
  socket.on("data", function (data) {
    console.log(data);
  });
  socket.pipe(ws, { end: false });
  socket.on("end", function () {
    ws.end("over", function () {
      socket.unpipe(ws);
    });
  });
});

server.listen(8080);
