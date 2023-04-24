const net = require("net");

const server = net.createServer({ allowHalfOpen: true }, function (socket) {
  console.log("客户端已经连接");
  socket.setEncoding("utf8");
  socket.on("data", function (data) {
    console.log("已接收客户端发送的数据:%s", data);
    socket.write("服务器确认数据：" + data);
  });
  socket.on("error", function (err) {
    console.log("与客户端通信过程中发生了错误，错误编码为%s", err.code);
    socket.destroy();
  });
  socket.on("end", function (err) {
    console.log("客户端已经关闭连接");
    socket.end();
    server.unref();
  });
  socket.on("close", function (hasError) {
    if (hasError) {
      console.log("由于错误导致socket关闭");
      server.unref();
    } else {
      console.log("端口正常关闭");
    }
  });
  server.getConnections((err, count) => {
    if (count == 2) server.close();
  });
});
server.listen(10086, function () {});
server.on("close", function () {
  console.log("服务器关闭");
});
