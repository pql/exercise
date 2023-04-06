## 1.流的概念

- 流是一组有序的，有起点和终点的字节数据传输手段
- 它不关心文件的整体内容，只关注是否从文件中读到了数据，已经读到数据之后的处理
- 流是一个抽象接口，被 Node 中的很多对象所实现。比如 HTTP 服务器 request 和 response 对象都是流。

## 2.可读流 createReadStream

实现了 `stream.Readable` 接口的对象，将对象数据读取为流数据，当监听 data 事件后，开始发射数据

```js
fs.createReadStream = function (path, options) {
  return new ReadStream(path, options);
};
util.inherits(ReadStream, Readable);
```

### 2.1 创建可读流

```js
var rs = fs.createReadStream(path, [options]);
```

1. path 读取文件的路径
2. options
   - flags 打开文件要做的操作，默认为'r'
   - encoding 默认为 null
   - start 开始读取的索引位置
   - end 结束读取的索引位置(包括结束位置)
   - highWaterMark 读取缓存区默认的大小 46kb

> 如果要指定 utf8 编码 highWaterMark 要大于 3 个字节

### 2.2 监听 data 事件

流切换到流动模式，数据会尽可能快的读出

```js
rs.on("data", function (data) {
  console.log(data);
});
```

### 2.3 监听 end 事件

该事件会在读完数据后被触发

```js
rs.on("end", function (err) {
  console.log("读取完成");
});
```

### 2.4 监听 error 事件

```js
rs.on("error", function (err) {
  console.log(err);
});
```

### 2.5 监听 open 事件

```js
rs.on("open", function () {
  console.log(err);
});
```

### 2.6 监听 close 事件

```js
rs.on("close", function () {
  console.log(err);
});
```

### 2.7 设置编码

与指定{encoding: 'utf8'}效果相同，设置编码

```js
rs.setEncoding("utf8");
```

### 2.8 暂停和恢复触发 data

通过 pause() 方法和 resume() 方法

```js
rs.on("data", function (data) {
  rs.pause();
  console.log(data);
});
setTimeout(function () {
  rs.resume();
}, 2000);
```

## 3. 可写流 createWriteStream

实现了 stream.Writable 接口的对象来将流数据写入到对象中

```js
fs.createWriteStream = function (path, options) {
  return new WriteStream(path, options);
};
util.inherits(WriteStream, Writable);
```

### 3.1 创建可写流

```js
var ws = fs.createWriteStream(path, [options]);
```

1. path 写入的文件路径
2. options
   - flags 打开文件要做的操作，默认为 'w'
   - encoding 默认为 utf8
   - highWaterMark 写入缓存区的默认大小 16kb

### 3.2 write 方法

```js
ws.write(chunk, [encoding], [callback]);
```

1. chunk 写入的数据 buffer/string
2. encoding 编码格式 chunk 为字符串时有用，可选
3. callback 写入成功后的回调

> 返回值为布尔值，系统缓存区满时为 false, 未满时为 true

### 3.3 end 方法

```js
ws.end(chunk, [encoding], [callback]);
```

> 表明接下来没有数据要被写入 Writable 通过传入可选的 chunk 和 encoding 参数，可以在关闭流之前再写入一段数据 如果传入了可选的 callback 函数，它将作为 'finish' 事件的回调函数

### 3.4 drain 方法

- 当一个流不处在 drain 的状态，对 write() 的调用会缓存数据块，并且返回 false。一旦所有当前所有缓存的数据块都排空了（被操作系统接受来进行输出），那么 'drain' 事件就会被触发
- 建议，一旦 write() 返回 false, 在 'drain' 事件触发前，不能写入任何数据块

```js
const fs = require("fs");
const ws = fs.createWriteStream("./2.txt", {
  flags: "w",
  encoding: "utf8",
  highWaterMark: 3,
});
let i = 10;
function write() {
  let flag = true;
  while (i && flag) {
    flag = ws.write("1");
    i--;
    console.log(flag);
  }
}
write();
ws.on("drain", () => {
  console.log("drain");
  write();
});
```

### 3.5 finish 方法

在调用了 stream.end() 方法，且缓冲区数据都已经传给底层系统之后，'finish' 事件将被触发。

```js
const writer = fs.createWriteStream("./2.txt");
for (let i = 0; i < 100; i++) {
  writer.write(`hello, ${i}!\n`);
}
writer.end("结束\n");
writer.on("finish", () => {
  console.error("所有的写入已经完成!");
});
```
