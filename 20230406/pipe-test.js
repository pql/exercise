const fs = require("fs");
const rs = fs.createReadStream("./1.txt");
const ws = fs.createWriteStream("./2.txt");
rs.on("data", function (data) {
  const flag = ws.write(data);
  if (!flag) rs.pause();
});
ws.on("drain", function () {
  rs.resume();
});
rs.on("end", function () {
  ws.end();
});
