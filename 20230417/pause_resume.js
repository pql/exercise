const net = require("net");
const path = require("path");

const file = require("fs").createWriteStream(path.join(__dirname, "msg.txt"));
const server = net.createServer(function (socket) {
  socket.pause();
  setTimeout(function () {
    socket.resume();
    socket.pipe(file);
  }, 10 * 1000);
});
server.listen(8080);
