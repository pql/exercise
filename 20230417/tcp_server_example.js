const net = require("net");

const server = net.createServer(function (socket) {
  console.log("客户端已连接");
});

server.listen(8080, "localhost", function () {
  console.log("服务器开始监听");
});
