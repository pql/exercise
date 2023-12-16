const net = require("net");
const path = require("path");

const file = require("fs").createWriteStream(path.join(__dirname, "msg.txt"));
const server = net.createServer(function (socket) {
  socket.pipe(file, {
    end: false,
  });
  setTimeout(function () {
    file.end("bye bye");
    socket.unpipe(file);
  }, 5000);
  //   socket.on("end", function () {
  //     file.end("bye bye");
  //   });
});

server.listen(8080);
