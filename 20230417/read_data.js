const net = require("net");
const server = net.createServer(function (socket) {
  socket.setEncoding("utf8");
  socket.on("data", function (data) {
    console.log(
      "本次收到的内容为%s,累计收到的字节数是%d",
      data,
      socket.bytesRead
    );
  });
  socket.on("end", function () {
    console.log("客户端已经关闭");
  });
});
server.listen(8080);
