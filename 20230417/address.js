/**
 * net.Socket 代表一个socket端口对象，它是一个可读可写流。
 */

const net = require("net");
const util = require("util");
const server = net.createServer(function (socket) {
  server.getConnections((err, count) => {
    server.maxConnections = 1;
    console.log("最大连接数量%d,当前连接数量%d", server.maxConnections, count);
  });
  const address = socket.address();
  console.log("客户端地址 %s", util.inspect(address()));
});
server.listen(8080);