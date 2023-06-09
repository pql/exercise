const fs = require("fs");
const ReadStream = require("./ReadStream");
const rs = new ReadStream("./1.txt", {
  flags: "r",
  encoding: "utf8",
  start: 3,
  end: 7,
  highWaterMark: 3,
});
rs.on("open", function () {
  console.log("open");
});
rs.on("data", function (data) {
  console.log(data);
});
rs.on("end", function () {
  console.log("end");
});
rs.on("close", function () {
  console.log("close");
});
