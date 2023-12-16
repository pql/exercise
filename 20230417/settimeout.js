const net = require("net");
const path = require("path");
const ws = require("fs").createWriteStream(path.resolve(__dirname, "msg.txt"));
const server = net.createServer(function (socket) {
  socket.setTimeout(5 * 1000);
  socket.pause();
  socket.on("timeout", function () {
    socket.pipe(ws);
  });

  // socket.setTimeout(0); 取消超时时间的设置
});
server.listen(8080);
