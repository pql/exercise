/**
 * 1. 创建一个服务器
 * 2. 客户端可以连接服务器
 * 3. 客户端可以发言，然后广播给大家
 * 4. 客户端连接和退出后都要通知大家
 * 5. 显示当前的在线人数
 */
const net = require("net");
const util = require("util");

const clients = {};

const server = net.createServer(function (socket) {
  server.getConnections(function (err, count) {
    socket.write(
      `welcome, there is ${count} users now, please input your username\r\n`
    );
    let nickname;
    socket.setEncoding("utf8");
    socket.on("data", function (data) {
      data = data.replace(/\r\n/, "");
      if (data == "byebye") {
        socket.end();
      } else {
        if (nickname) {
          broadcast(nickname, `${nickname}:${data}`);
        } else {
          nickname = data;
          clients[nickname] = socket;
          broadcast(nickname, `welcome ${nickname} joined us!`);
        }
      }
    });
    socket.on("close", function () {
      socket.destroy();
    });
  });
});
server.listen(10086);

function broadcast(nickname, msg) {
  for (let key in clients) {
    if (key != nickname) {
      clients[key].write(msg + "\r\n");
      clients[nickname].destroy();
      delete clients[nickname];
    }
  }
}
