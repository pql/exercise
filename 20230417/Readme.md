## 1.TCP

在 Node.js 中，提供了 net 模块来实现 TCP 服务器和客户端的通信。

### 1.1 TCP 服务器

```js
net.createServer([options][, connectionListener])
```

- options.allowHalfOpen 是否允许单方面连接，默认值为 false
- connectionListener 参数用于指定当客户端与服务器建立连接时所要调用的回调函数，回调中有一个参数 socket, 指的是 TCP 服务器监听的 socket 端口对象

也可以通过监听 connection 事件的方式来指定监听函数

```js
server.on("connection", function (socket) {});
```

#### 1.1.1 启动 TCP 服务器

可以使用 listen 方法通知服务器开始监听客户端的连接

```js
server.listen(port, [host], [backlog], [callback]);
```

- port 必须指定的端口号
- host 指定需要监听的 IP 地址或主机名， 如果省略的话服务器将监听来自于任何客户端的连接
- backlog 指定位于等待队列中的客户端连接的最大数量，默认值为 511

```js
server.on("listening", function () {});
```

#### 1.1.2 使用 TCP 服务器

```js
const net = require("net");
const server = net.createServer(function (socket) {
  console.log("客户端已连接");
});
server.listen(8080, "localhost", function () {
  console.log("服务器开始监听");
});
```

#### 1.1.3 address

```js
server.address();
```

- port 端口号
- address TCP 服务器监听的地址
- family 协议的版本

#### 1.1.4 getConnections

查看当前与 TCP 服务器建立连接的客户端的连接数量以及设置最大连接数量

```js
server.getConnections(callback);
server.maxConnections = 2;
```

#### 1.1.5 close

使用 close 方法可以显示拒绝所有的客户端的连接请求，当所有已连接的客户端关闭后服务器会自动关闭，并触发服务器的 close 事件。

```js
server.close();
server.on("close", callback);
```

### 1.2 socket

#### 1.2.1 address

net.Socket 代表一个 socket 端口对象，它是一个可读可写流。

```js
const net = require("net");
const util = require("util");
const server = net.createServer(function (socket) {
  server.getConnections((err, count) => {
    server.maxConnections = 1;
    console.log("最大连接数量%d,当前连接数量%d", server.maxConnections, count);
  });
  const address = socket.address();
  console.log("客户端地址 %s", util.inspect(address));
});
```

#### 1.2.2 读取数据

```js
const server = net.createServer(function (socket) {
  socket.setEncoding("utf8");
  socket.on("data", function (data) {
    console.log(
      "本次收到的内容为 %s, 累计收到的字节数是 %d",
      data,
      socket.bytesRead
    );
  });
});
```

#### 1.2.3 监听关闭事件

```js
const server = net.createServer(function (socket) {
  socket.on("end", function () {
    console.log("客户端已经关闭");
  });
});
```

#### 1.2.4 pipe

pipe 方法可以将客户端发送的数据写到文件或其他目标中。

```js
socket.pipe(destination, [options]);
```

- options.end 设置为 false 时当客户端结束写操作或关闭后并不会关闭目标对象，还可以继续写入数据

```js
const net = require("net");
const path = require("path");
const ws = require("fs").createWriteStream(path.resolve(__dirname, "msg.txt"));

const server = net.createServer(function (socket) {
  socket.on("data", function (data) {
    console.log(data);
  });
  socket.pipe(ws, { end: false });
  socket.on("end", function () {
    ws.end("over", function () {
      socket.unpipe(ws);
    });
  });
});
```

#### 1.2.5 unpipe

```js
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
```

#### 1.2.6 pause & resume

`pause` 可以暂停 `data` 事件触发，服务器会把客户端发送的数据暂存在缓存区里

```js
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
```

#### 1.2.7 setTimeout

```js
const net = require("net");
const path = require("path");
const ws = require("fs").createWriteStream(path.resolve(__dirname, "msg.txt"));

const server = net.createServer(function (socket) {
  socket.setTimeout(5 * 1000);
  socket.pause();
  socket.on("timeout", function () {
    socket.pipe(ws);
  });

  // socket.setTimeout(0); 取消超时时间的设置
});

server.listen(8080);
```

### 1.3 TCP 客户端

#### 1.3.1 创建 TCP 客户端

```js
const socket = new net.Socket([options]);
```

- fd socket 文件描述符
- type 客户端所有协议
- allowHalfOpen 是否允许半连接，服务器收到 FIN 包时不回发 FIN 包，可以使服务器可以继续向客户端发数据

```js
socket.connect(port, host, callback);
socket.on("connect", callback);
```

#### 1.3.2 向服务器端写入数据、write、end、error、destroy、close

- write 表示向服务器写入数据
- end 用于结束连接
- error 连接发送错误
- destroy 销毁流
- close 表示连接关闭成功，hasError=true 代表有可能有错误

```js
socket.write(data, [encoding], [callback]);
```

```js
const net = require("net");
const server = net.createServer(function (socket) {
  console.log("客户端已经连接");
  socket.setEncoding("utf8");
  socket.on("data", function (data) {
    console.log("已接收客户端发送的数据:%s", data);
    socket.write("服务器：" + data);
  });
  socket.on("error", function (err) {
    console.log("与客户端通信过程中发生了错误，错误编码为%s", err.code);
    socket.destroy();
  });
  socket.on("end", function (err) {
    console.log("客户端已经关闭连接");
    socket.destory();
  });
  socket.on("close", function (hasError) {
    console.log(hasError ? "异常关闭" : "正常关闭");
  });
});
server.listen(8080, function () {
  const client = new net.Socket();
  client.setEncoding("utf8");
  client.connect(8080, "127.0.0.1", function () {
    console.log("客户端已连接");
    client.write("hello");
    setTimeout(function () {
      client.end("byebye");
    }, 5000);
  });
  client.on("data", function (data) {
    console.log("以及接收到服务器发过来的数据: %s", data);
  });
  client.on("error", function (err) {
    console.log("与服务器通信过程中发生了错误，错误编码为：%s", err.code);
    client.destroy();
  });
});
```

#### 1.3.3 close

停止 server 接受建立新的 connections 并保存已经存在的 connections

```js
server.getConnections((err, count) => {
  if (count == 2) server.close();
});
```

#### 1.3.4 unref&ref

unref 方法指定发往客户端连接被全部关闭时退出应用程序 如果将 allowHalfOpen 方法设置为 true，必须使用与客户端连接的 socket 端口对象的 end 方法主动关闭服务器端连接

```js
const net = require("net");
const server = net.createServer({ allowHalfOpen: true }, function (socket) {
  console.log("客户端已经连接");
  socket.setEncoding("utf8");
  socket.on("data", function (data) {
    console.log("已接收客户端发送的数据：%s", data);
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

server.listen(8080, function () {});
server.on("close", function () {
  console.log("服务器关闭");
});
```

#### 1.3.5 bufferSize

write 的返回值和 bufferSize 属性值

```js
const net = require("net");
const path = require("path");
const fs = require("fs");

const server = net.createServer({ allowHalfOpen: true }, function (socket) {
  console.log("客户端已经连接");
  socket.setEncoding("utf8");
  const rs = fs.createReadStream(path.resolve(__dirname, "a.txt"), {
    highWaterMark: 2,
  });
  rs.on("data", function (data) {
    const flag = socket.write(data);
    console.log("flag:", flag);
    console.log("缓存字节:", socket.bufferSize);
    console.log("已发送字节:", socket.bytesWritten);
  });
  socket.on("data", function (data) {
    console.log("data", data);
  });
  socket.on("drain", function (err) {
    console.log("缓存区已全部发送");
  });
});
```

#### 1.3.6 keepAlive

当服务器和客户端建立连接后，当一方主机突然断电、重启、系统崩溃等意外情况时，将来不及向另一方发送 FIN 包，这样另一方将永远处于连接状态。可以使用 setKeppAlive 方法来解决这一个问题

```js
socket.setKeepAlive([enaable], [initialDelay]);
```

- enable 是否启用嗅探，为 true 时会不断向对方发送探测包，没有响应则认为对方已经关闭连接，自己则关闭连接
- initialDelay 多久发送一次探测包，单位是毫秒

#### 1.3.7 聊天室 1.0

```js
/**
 * 1. 创建一个服务器
 * 2. 客户端可以连接服务器
 * 3. 客户端可以发言，然后广播给大家
 * 4. 客户端连接和退出后都要通知大家
 * 5. 显示当前的在线人数
 */
```
